const { Schedule } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import dayjs from "dayjs";


const resolvers = {
    Query: {
        schedules: async () => {
            return Schedule.findAll();
        },
        schedule: async (parent, { scheduleId }) => {
            return Schedule.findOne({ _id: scheduleId });
        },
    },
    MyDate: new GraphQLScalarType({
            name: 'Date',
            description: 'Date custom scalar type',
            parseValue(value) {
                return dayjs(value); // value from the client
            },
            serialize(value) {
                return dayjs(value).format("DD-MM-YYYY"); // value sent to the client
            },
            parseLiteral(ast) {
                if (ast.kind === Kind.STRING) {
                    return dayjs(ast.value) // ast value is always in string format
                }
                return null;
            }
        }),
    
    Mutation: {
        addSchedule: async (parent, args) => {
            if (Schedule.find(s => (s.scheduleDate === args.scheduleDate && s.scheduleHour === args.scheduleHour))){
                throw new AuthenticationError('Este horario ya está creado!');
            }

            const schedule = await Schedule.create({
                scheduleDate: args.scheduleDate,
                scheduleHour: args.scheduleHour,
                teacher: args.teacher,
                busy: 0
            });
            await Schedule.Update(
                { $addToSet: { schedules: schedule } }
            );
            
            return schedule;
        }
    },

        removeSchedule: async (parent, { scheduleId }) => {
            return Schedule.findOneAndDelete({ _id: scheduleId});
        },

        updateSchedule: async (parent, { scheduleId, newDate, newHour,newTeacher }) => {
           return await Schedule.findOneAndUpdate(
                { _id: scheduleId },
               {
                   $pull: {
                       scheduleDate: newDate,
                       scheduleHour: newHour,
                       teacher:newTeacher
                   }
               },
                //Devuelvo objeto actualizado
                { new: true }
            );
        }
    }

module.exports = resolvers;
