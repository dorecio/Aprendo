const { Schedule, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('fechas');;
        },
        user: async (parent, { username }) => {
            return User.findOne({ userName: username }).populate('fechas', 'temas');
        },

        teachers: async () => {
            return User.findAll(User.rol === "maestro").populate('fechas', 'temas');
        },

        students: async () => {
            return User.findAll(User.rol === "estudiente").populate('fechas', 'temas');
        },

        schedules: async () => {
            return Schedule.findAll();
        },
        schedule: async (parent, { scheduleId }) => {
            return Schedule.findOne({ _id: scheduleId });
        },

        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('Necesitas estar registrado!');
        },
    },


    Mutation: {
        addUser: async (parent, { username, email, password, rol }) => {
            // Crear usuario
            const user = await User.create({ username, email, password, rol });
            // Firmamar un token web de JSON e iniciar sesión después de crearlo
            const token = signToken(user);
            // Devolver un objeto `Auth` que consta del token firmado y la información del usuario
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            // Buscar al usuario por la dirección de correo electrónico proporcionada
            const user = await User.findOne({ email });

            //Si no existe el usuario, se envía error de autenticación 
            if (!user) {
                throw new AuthenticationError('No existe usuario con esta dirección de correo electrónico');
            }

            // Si existe el usuario se ejecuta el método de instancia `isCorrectPassword` y verificamos si la contraseña es correcta
            const correctPw = await user.isCorrectPassword(password);

            // Si la contraseña es incorrecta, se devuelve error de autenticación 
            if (!correctPw) {
                throw new AuthenticationError('Contraseña incorrecta');
            }

            // Si el correo electrónico y contraseña son correctos, se inicia sesión en la app con un JWT
            const token = signToken(user);

            // Devolver un objeto `Auth` que consta del token firmado y la información del usuario
            return { token, user };
        },
        removeUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }
            throw new AuthenticationError('Necesitas estar registrado!');
        },

        addSchedule: async (parent, args, context) => {
            if (context.user) {
                const data = Schedule.find(s => (s.scheduleDate === args.scheduleDate && s.scheduleHour === args.scheduleHour))
                console.log('ESTE ES EL DATO', data);
                if (data) {
                    throw new AuthenticationError('Este horario ya está creado!');
                }
                const schedule = await Schedule.create(args);

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { fechas: schedule._id } }
                );

                return schedule;
            } else {
                throw new AuthenticationError('Necesitas estar registrado!');
            }
        },

        updateSchedule: async (parent, { scheduleId, newDate, newHour, newTeacher }) => {
            if (context.user) {
                return await Schedule.findOneAndUpdate(
                    { _id: scheduleId },
                    {
                        $pull: {
                            scheduleDate: newDate,
                            scheduleHour: newHour,
                            teacher: newTeacher
                        }
                    },
                    //Devuelvo objeto actualizado
                    { new: true }
                );
            }
            throw new AuthenticationError('Necesitas estar registrado!');
        },

        removeSchedule: async (parent, { scheduleId }, context) => {
            if (context.user) {
                return Schedule.findOneAndDelete({ _id: scheduleId });
            }
            throw new AuthenticationError('Necesitas estar registrado!');
        },
    },
};

module.exports = resolvers;