
import { SleepRecord } from "@/types/recovery";

// Mock sleep records data
export const sleepRecords: SleepRecord[] = [
  {
    id: "sleep-1",
    userId: "user-1",
    date: new Date("2024-05-15"),
    bedTime: new Date("2024-05-15T22:30:00"),
    wakeTime: new Date("2024-05-16T06:30:00"),
    duration: 480, // 8 hours in minutes
    quality: 8,
    interruptions: 1,
    feelingOnWaking: "refreshed",
    sleepAids: [],
    notes: "Boa noite de sono após um dia de treino intenso.",
    deviceData: {
      source: "Apple Watch",
      deepSleep: 120,
      lightSleep: 240,
      remSleep: 120,
      heartRateDuringSleep: [58, 56, 54, 55, 58, 60, 58, 57],
      respirationRate: [14, 13, 14, 14, 15, 14, 13, 14],
      oxygenSaturation: [98, 97, 98, 98, 97, 98, 98, 97],
    },
    createdAt: new Date("2024-05-16T06:45:00"),
    updatedAt: new Date("2024-05-16T06:45:00")
  },
  {
    id: "sleep-2",
    userId: "user-1",
    date: new Date("2024-05-14"),
    bedTime: new Date("2024-05-14T23:15:00"),
    wakeTime: new Date("2024-05-15T06:45:00"),
    duration: 450, // 7.5 hours in minutes
    quality: 6,
    interruptions: 2,
    feelingOnWaking: "tired",
    sleepAids: ["melatonina"],
    notes: "Dificuldade para dormir, estresse do trabalho.",
    deviceData: {
      source: "Apple Watch",
      deepSleep: 90,
      lightSleep: 260,
      remSleep: 100,
      heartRateDuringSleep: [62, 60, 58, 59, 61, 63, 60, 59],
      respirationRate: [15, 14, 15, 15, 16, 15, 14, 15],
      oxygenSaturation: [97, 97, 96, 97, 96, 97, 97, 96],
    },
    createdAt: new Date("2024-05-15T07:00:00"),
    updatedAt: new Date("2024-05-15T07:00:00")
  },
  {
    id: "sleep-3",
    userId: "user-1",
    date: new Date("2024-05-13"),
    bedTime: new Date("2024-05-13T22:00:00"),
    wakeTime: new Date("2024-05-14T06:30:00"),
    duration: 510, // 8.5 hours in minutes
    quality: 9,
    interruptions: 0,
    feelingOnWaking: "refreshed",
    sleepAids: ["magnésio"],
    notes: "Excelente noite de sono após dia de descanso.",
    deviceData: {
      source: "Apple Watch",
      deepSleep: 150,
      lightSleep: 230,
      remSleep: 130,
      heartRateDuringSleep: [56, 55, 53, 54, 56, 57, 56, 55],
      respirationRate: [13, 12, 13, 13, 14, 13, 12, 13],
      oxygenSaturation: [98, 98, 99, 98, 98, 99, 98, 98],
    },
    createdAt: new Date("2024-05-14T06:40:00"),
    updatedAt: new Date("2024-05-14T06:40:00")
  },
  {
    id: "sleep-4",
    userId: "user-1",
    date: new Date("2024-05-12"),
    bedTime: new Date("2024-05-12T23:30:00"),
    wakeTime: new Date("2024-05-13T07:00:00"),
    duration: 450, // 7.5 hours in minutes
    quality: 7,
    interruptions: 1,
    feelingOnWaking: "neutral",
    sleepAids: [],
    notes: "Sono ok, mas acordei uma vez durante a noite.",
    deviceData: {
      source: "Apple Watch",
      deepSleep: 110,
      lightSleep: 240,
      remSleep: 100,
      heartRateDuringSleep: [59, 58, 56, 57, 59, 60, 58, 57],
      respirationRate: [14, 13, 14, 14, 15, 14, 13, 14],
      oxygenSaturation: [97, 97, 98, 97, 97, 98, 97, 97],
    },
    createdAt: new Date("2024-05-13T07:15:00"),
    updatedAt: new Date("2024-05-13T07:15:00")
  },
  {
    id: "sleep-5",
    userId: "user-1",
    date: new Date("2024-05-11"),
    bedTime: new Date("2024-05-11T22:45:00"),
    wakeTime: new Date("2024-05-12T06:15:00"),
    duration: 450, // 7.5 hours in minutes
    quality: 8,
    interruptions: 0,
    feelingOnWaking: "refreshed",
    sleepAids: [],
    notes: "Boa noite de sono após treino de pernas.",
    deviceData: {
      source: "Apple Watch",
      deepSleep: 130,
      lightSleep: 220,
      remSleep: 100,
      heartRateDuringSleep: [57, 56, 54, 55, 57, 59, 57, 56],
      respirationRate: [14, 13, 13, 13, 14, 14, 13, 13],
      oxygenSaturation: [98, 98, 97, 98, 98, 97, 98, 98],
    },
    createdAt: new Date("2024-05-12T06:30:00"),
    updatedAt: new Date("2024-05-12T06:30:00")
  }
];
