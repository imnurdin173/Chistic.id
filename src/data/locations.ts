// src/data/indonesia-locations.ts
export interface ProvinceData {
  province: string;
  cities: string[];
}

export const INDONESIA_LOCATIONS: ProvinceData[] = [
  {
    province: "DKI Jakarta",
    cities: ["Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur", "Kepulauan Seribu"],
  },
  {
    province: "Jawa Barat",
    cities: ["Bandung", "Bekasi", "Bogor", "Depok", "Cimahi", "Tasikmalaya", "Cirebon"],
  },
  {
    province: "Jawa Timur",
    cities: ["Surabaya", "Malang", "Batu", "Kediri", "Madiun", "Banyuwangi"],
  },
  {
    province: "Bali",
    cities: ["Denpasar", "Badung", "Gianyar", "Tabanan"],
  },
];