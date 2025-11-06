// Backend'deki Job.java'nın frontend'deki karşılığı
export interface Job {
  id?: number; // Opsiyonel, çünkü oluştururken ID olmaz
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requiredSkills: string[]; // Bu, "Match" için gerekli
  postedDate?: string; // Veya Date
}