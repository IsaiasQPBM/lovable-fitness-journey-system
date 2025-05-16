
// Este arquivo agora serve como um ponto central para exportar todos os dados do monitoramento corporal

import { userBodyProfile } from './userBodyProfile';
import { bodyMeasurementHistory } from './bodyMeasurementData';
import { photoRecords } from './photoRecordsData';
import { bodyGoals } from './bodyGoalsData';
import { progressReports } from './progressReportsData';

// Re-exportando todos os dados para manter compatibilidade com código existente
export {
  userBodyProfile,
  bodyMeasurementHistory,
  photoRecords,
  bodyGoals,
  progressReports
};
