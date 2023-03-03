const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar MyDate

  type Schedule {
    _id: ID!
    scheduleDate:MyDate
    scheduleHour:Int 
    teacher:Int
    busy:Boolean
    }

  type Query {
    schedules:[Schedule]
    schedule(scheduleId: ID!): Schedule
  }

  type Mutation {
    addSchedule(schedule:Schedule ):Schedule
    removeSchedule(id:ID!):Schedule
    updateSchedule(scheduleDate:MyDate, scheduleHour:Int,teacher:Int):Schedule
  }
`;

module.exports = typeDefs;