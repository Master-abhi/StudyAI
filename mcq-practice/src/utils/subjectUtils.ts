let customSubjectRenames: Record<string, string> = {};

export function setCustomSubjectRenames(map: Record<string, string>) {
  if (map && typeof map === 'object') {
    customSubjectRenames = map;
  }
}

export function getCanonicalSubject(rawSubject?: string): string {
  if (!rawSubject || typeof rawSubject !== 'string') return 'General Knowledge';
  let trimmed = rawSubject.trim().replace(/\s+/g, ' ');
  if (!trimmed) return 'General Knowledge';
  
  const lower = trimmed.toLowerCase();
  if (customSubjectRenames[lower]) {
    return customSubjectRenames[lower];
  }
  
  if (lower === 'all' || lower === 'all subjects' || lower === 'mixed' || lower === 'full syllabus') {
    return 'Full Syllabus / All Subjects';
  }
  
  // Standardize common subject cased variations
  if (lower === 'cg gk' || lower === 'cggk' || lower === 'cg general knowledge' || lower === 'chhattisgarh gk') return 'CG GK';
  if (lower === 'cg geography' || lower === 'chhattisgarh geography') return 'CG Geography';
  if (lower === 'cg history' || lower === 'chhattisgarh history') return 'CG History';
  if (lower === 'cg polity' || lower === 'cg admin' || lower === 'chhattisgarh polity') return 'CG Polity & Governance';
  if (lower === 'cg economy' || lower === 'chhattisgarh economy') return 'CG Economy';
  if (lower === 'cg culture' || lower === 'cg culture & tribe' || lower === 'cg tribe' || lower === 'chhattisgarh culture') return 'CG Culture & Tribes';
  if (lower === 'general knowledge' || lower === 'gk' || lower === 'general studies' || lower === 'gs') return 'General Knowledge';
  if (lower === 'indian history' || lower === 'history of india' || lower === 'history') return 'Indian History';
  if (lower === 'indian polity' || lower === 'indian constitution' || lower === 'polity') return 'Indian Polity';
  if (lower === 'indian geography' || lower === 'geography') return 'Indian Geography';
  if (lower === 'indian economy' || lower === 'economy') return 'Indian Economy';
  if (lower === 'general science' || lower === 'science') return 'General Science';
  if (lower === 'aptitude' || lower === 'maths' || lower === 'mathematics' || lower === 'quant') return 'Aptitude & Maths';
  if (lower === 'reasoning' || lower === 'logical reasoning') return 'Reasoning';
  if (lower === 'hindi' || lower === 'hindi language') return 'Hindi Language';
  if (lower === 'chhattisgarhi' || lower === 'chhattisgarhi language') return 'Chhattisgarhi Language';
  if (lower === 'english' || lower === 'english language') return 'English Language';
  if (lower === 'current affairs' || lower === 'ca') return 'Current Affairs';

  // Capitalize first letter of each word if all lowercase or uppercase
  if (trimmed === trimmed.toLowerCase() || trimmed === trimmed.toUpperCase()) {
    return trimmed.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  }
  
  return trimmed;
}

export interface SubjectOption {
  label: string;
  value: string;
  count?: number;
}

export function getUniqueSubjectOptions(
  activeExamSubjects?: { name: string }[],
  poolStatsSubjects?: { [key: string]: number } | null
): SubjectOption[] {
  const map = new Map<string, SubjectOption>();

  if (activeExamSubjects && Array.isArray(activeExamSubjects)) {
    activeExamSubjects.forEach(s => {
      if (s && s.name) {
        const canonical = getCanonicalSubject(s.name);
        const key = canonical.toLowerCase();
        if (!map.has(key)) {
          map.set(key, { label: canonical, value: canonical });
        }
      }
    });
  }

  if (poolStatsSubjects && typeof poolStatsSubjects === 'object') {
    Object.entries(poolStatsSubjects).forEach(([sub, count]) => {
      const canonical = getCanonicalSubject(sub);
      const key = canonical.toLowerCase();
      if (!map.has(key)) {
        map.set(key, { label: canonical, value: canonical, count });
      } else {
        const existing = map.get(key)!;
        existing.count = (existing.count || 0) + count;
      }
    });
  }

  return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
}
