const { gql } = require('apollo-server-express');

const typeDefs = gql`
 
  type User {
    _id:ID
    username:String
    email:String
    password: String
    rol:String!
    themes:[Theme]!
    fechas:[Schedule]!
  }

  type Schedule {
    _id: ID!
    scheduleDate:String
    scheduleHour:Int 
    teacher:Int
    theme:Int
    student:Int
    }

  type Theme {
    _id:ID!
    name:String
    teachers:[User]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users:[User]!
    user(username: String!):User
    
    teachers:[User]!
    students:[User]!
        
    schedules:[Schedule]
    schedule(_id: ID!): Schedule

    themes:[Theme]
    theme(_id:ID!):Theme
    
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!,rol:String!): Auth
    login(email: String!, password: String!): Auth
    removeUser: User
    addSchedule(scheduleDate:String!, scheduleHour:Int!, theme:String! ):Schedule
    updateSchedule(_id:ID!, scheduleDate:String, scheduleHour:Int,teacher:Int):Schedule
    removeSchedule(_id:ID!):Schedule
    #addTheme:
  }
`;

module.exports = typeDefs;