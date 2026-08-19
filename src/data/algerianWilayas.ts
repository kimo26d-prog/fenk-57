export interface Wilaya {
  code: string;
  number: number;
  nameAr: string;
  nameEn: string;
  ar: string;
  name: string;
  region: 'الوسط' | 'الشرق' | 'الغرب' | 'الجنوب' | 'الهضاب العليا';
}

export const ALGERIA_COUNTRY_INFO = {
  nameAr: 'الجمهورية الجزائرية الديمقراطية الشعبية',
  shortNameAr: 'الجزائر',
  nameEn: 'Algeria',
  dialCode: '+213',
  currency: 'د.ج',
  currencyName: 'دينار جزائري (DZD)',
  totalWilayas: 69
};

export const ALGERIAN_WILAYAS: Wilaya[] = [
  { code: '01', number: 1, nameAr: 'أدرار', nameEn: 'Adrar', ar: 'أدرار', name: 'Adrar', region: 'الجنوب' },
  { code: '02', number: 2, nameAr: 'الشلف', nameEn: 'Chlef', ar: 'الشلف', name: 'Chlef', region: 'الغرب' },
  { code: '03', number: 3, nameAr: 'الأغواط', nameEn: 'Laghouat', ar: 'الأغواط', name: 'Laghouat', region: 'الهضاب العليا' },
  { code: '04', number: 4, nameAr: 'أم البواقي', nameEn: 'Oum El Bouaghi', ar: 'أم البواقي', name: 'Oum El Bouaghi', region: 'الشرق' },
  { code: '05', number: 5, nameAr: 'باتنة', nameEn: 'Batna', ar: 'باتنة', name: 'Batna', region: 'الشرق' },
  { code: '06', number: 6, nameAr: 'بجاية', nameEn: 'Béjaïa', ar: 'بجاية', name: 'Béjaïa', region: 'الوسط' },
  { code: '07', number: 7, nameAr: 'بسكرة', nameEn: 'Biskra', ar: 'بسكرة', name: 'Biskra', region: 'الجنوب' },
  { code: '08', number: 8, nameAr: 'بشار', nameEn: 'Béchar', ar: 'بشار', name: 'Béchar', region: 'الجنوب' },
  { code: '09', number: 9, nameAr: 'البليدة', nameEn: 'Blida', ar: 'البليدة', name: 'Blida', region: 'الوسط' },
  { code: '10', number: 10, nameAr: 'البويرة', nameEn: 'Bouira', ar: 'البويرة', name: 'Bouira', region: 'الوسط' },
  { code: '11', number: 11, nameAr: 'تمنراست', nameEn: 'Tamanrasset', ar: 'تمنراست', name: 'Tamanrasset', region: 'الجنوب' },
  { code: '12', number: 12, nameAr: 'تبسة', nameEn: 'Tébessa', ar: 'تبسة', name: 'Tébessa', region: 'الشرق' },
  { code: '13', number: 13, nameAr: 'تلمسان', nameEn: 'Tlemcen', ar: 'تلمسان', name: 'Tlemcen', region: 'الغرب' },
  { code: '14', number: 14, nameAr: 'تيارت', nameEn: 'Tiaret', ar: 'تيارت', name: 'Tiaret', region: 'الهضاب العليا' },
  { code: '15', number: 15, nameAr: 'تيزي وزو', nameEn: 'Tizi Ouzou', ar: 'تيزي وزو', name: 'Tizi Ouzou', region: 'الوسط' },
  { code: '16', number: 16, nameAr: 'الجزائر العاصمة', nameEn: 'Alger', ar: 'الجزائر العاصمة', name: 'Alger', region: 'الوسط' },
  { code: '17', number: 17, nameAr: 'الجلفة', nameEn: 'Djelfa', ar: 'الجلفة', name: 'Djelfa', region: 'الهضاب العليا' },
  { code: '18', number: 18, nameAr: 'جيجل', nameEn: 'Jijel', ar: 'جيجل', name: 'Jijel', region: 'الشرق' },
  { code: '19', number: 19, nameAr: 'سطيف', nameEn: 'Sétif', ar: 'سطيف', name: 'Sétif', region: 'الهضاب العليا' },
  { code: '20', number: 20, nameAr: 'سعيدة', nameEn: 'Saïda', ar: 'سعيدة', name: 'Saïda', region: 'الغرب' },
  { code: '21', number: 21, nameAr: 'سكيكدة', nameEn: 'Skikda', ar: 'سكيكدة', name: 'Skikda', region: 'الشرق' },
  { code: '22', number: 22, nameAr: 'سيدي بلعباس', nameEn: 'Sidi Bel Abbès', ar: 'سيدي بلعباس', name: 'Sidi Bel Abbès', region: 'الغرب' },
  { code: '23', number: 23, nameAr: 'عنابة', nameEn: 'Annaba', ar: 'عنابة', name: 'Annaba', region: 'الشرق' },
  { code: '24', number: 24, nameAr: 'قالمة', nameEn: 'Guelma', ar: 'قالمة', name: 'Guelma', region: 'الشرق' },
  { code: '25', number: 25, nameAr: 'قسنطينة', nameEn: 'Constantine', ar: 'قسنطينة', name: 'Constantine', region: 'الشرق' },
  { code: '26', number: 26, nameAr: 'المدية', nameEn: 'Médéa', ar: 'المدية', name: 'Médéa', region: 'الوسط' },
  { code: '27', number: 27, nameAr: 'مستغانم', nameEn: 'Mostaganem', ar: 'مستغانم', name: 'Mostaganem', region: 'الغرب' },
  { code: '28', number: 28, nameAr: 'المسيلة', nameEn: 'M\'Sila', ar: 'المسيلة', name: 'M\'Sila', region: 'الهضاب العليا' },
  { code: '29', number: 29, nameAr: 'معسكر', nameEn: 'Mascara', ar: 'معسكر', name: 'Mascara', region: 'الغرب' },
  { code: '30', number: 30, nameAr: 'ورقلة', nameEn: 'Ouargla', ar: 'ورقلة', name: 'Ouargla', region: 'الجنوب' },
  { code: '31', number: 31, nameAr: 'وهران', nameEn: 'Oran', ar: 'وهران', name: 'Oran', region: 'الغرب' },
  { code: '32', number: 32, nameAr: 'البيض', nameEn: 'El Bayadh', ar: 'البيض', name: 'El Bayadh', region: 'الهضاب العليا' },
  { code: '33', number: 33, nameAr: 'إليزي', nameEn: 'Illizi', ar: 'إليزي', name: 'Illizi', region: 'الجنوب' },
  { code: '34', number: 34, nameAr: 'برج بوعريريج', nameEn: 'Bordj Bou Arreridj', ar: 'برج بوعريريج', name: 'Bordj Bou Arreridj', region: 'الهضاب العليا' },
  { code: '35', number: 35, nameAr: 'بومرداس', nameEn: 'Boumerdès', ar: 'بومرداس', name: 'Boumerdès', region: 'الوسط' },
  { code: '36', number: 36, nameAr: 'الطارف', nameEn: 'El Tarf', ar: 'الطارف', name: 'El Tarf', region: 'الشرق' },
  { code: '37', number: 37, nameAr: 'تندوف', nameEn: 'Tindouf', ar: 'تندوف', name: 'Tindouf', region: 'الجنوب' },
  { code: '38', number: 38, nameAr: 'تيسمسيلت', nameEn: 'Tissemsilt', ar: 'تيسمسيلت', name: 'Tissemsilt', region: 'الهضاب العليا' },
  { code: '39', number: 39, nameAr: 'الوادي', nameEn: 'El Oued', ar: 'الوادي', name: 'El Oued', region: 'الجنوب' },
  { code: '40', number: 40, nameAr: 'خنشلة', nameEn: 'Khenchela', ar: 'خنشلة', name: 'Khenchela', region: 'الشرق' },
  { code: '41', number: 41, nameAr: 'سوق أهراس', nameEn: 'Souk Ahras', ar: 'سوق أهراس', name: 'Souk Ahras', region: 'الشرق' },
  { code: '42', number: 42, nameAr: 'تيبازة', nameEn: 'Tipaza', ar: 'تيبازة', name: 'Tipaza', region: 'الوسط' },
  { code: '43', number: 43, nameAr: 'ميلة', nameEn: 'Mila', ar: 'ميلة', name: 'Mila', region: 'الشرق' },
  { code: '44', number: 44, nameAr: 'عين الدفلى', nameEn: 'Aïn Defla', ar: 'عين الدفلى', name: 'Aïn Defla', region: 'الوسط' },
  { code: '45', number: 45, nameAr: 'النعامة', nameEn: 'Naâma', ar: 'النعامة', name: 'Naâma', region: 'الهضاب العليا' },
  { code: '46', number: 46, nameAr: 'عين تموشنت', nameEn: 'Aïn Témouchent', ar: 'عين تموشنت', name: 'Aïn Témouchent', region: 'الغرب' },
  { code: '47', number: 47, nameAr: 'غرداية', nameEn: 'Ghardaïa', ar: 'غرداية', name: 'Ghardaïa', region: 'الجنوب' },
  { code: '48', number: 48, nameAr: 'غليزان', nameEn: 'Relizane', ar: 'غليزان', name: 'Relizane', region: 'الغرب' },
  { code: '49', number: 49, nameAr: 'تيميمون', nameEn: 'Timimoun', ar: 'تيميمون', name: 'Timimoun', region: 'الجنوب' },
  { code: '50', number: 50, nameAr: 'برج باجي مختار', nameEn: 'Bordj Badji Mokhtar', ar: 'برج باجي مختار', name: 'Bordj Badji Mokhtar', region: 'الجنوب' },
  { code: '51', number: 51, nameAr: 'أولاد جلال', nameEn: 'Ouled Djellal', ar: 'أولاد جلال', name: 'Ouled Djellal', region: 'الجنوب' },
  { code: '52', number: 52, nameAr: 'بني عباس', nameEn: 'Béni Abbès', ar: 'بني عباس', name: 'Béni Abbès', region: 'الجنوب' },
  { code: '53', number: 53, nameAr: 'إن صالح', nameEn: 'In Salah', ar: 'إن صالح', name: 'In Salah', region: 'الجنوب' },
  { code: '54', number: 54, nameAr: 'إن قزام', nameEn: 'In Guezzam', ar: 'إن قزام', name: 'In Guezzam', region: 'الجنوب' },
  { code: '55', number: 55, nameAr: 'تقرت', nameEn: 'Touggourt', ar: 'تقرت', name: 'Touggourt', region: 'الجنوب' },
  { code: '56', number: 56, nameAr: 'جانت', nameEn: 'Djanet', ar: 'جانت', name: 'Djanet', region: 'الجنوب' },
  { code: '57', number: 57, nameAr: 'المغير', nameEn: 'El M\'Ghair', ar: 'المغير', name: 'El M\'Ghair', region: 'الجنوب' },
  { code: '58', number: 58, nameAr: 'المنيعة', nameEn: 'El Meniaa', ar: 'المنيعة', name: 'El Meniaa', region: 'الجنوب' },
  { code: '59', number: 59, nameAr: 'آفلو', nameEn: 'Aflou', ar: 'آفلو', name: 'Aflou', region: 'الهضاب العليا' },
  { code: '60', number: 60, nameAr: 'الأبيض سيدي الشيخ', nameEn: 'El Abiodh Sidi Cheikh', ar: 'الأبيض سيدي الشيخ', name: 'El Abiodh Sidi Cheikh', region: 'الجنوب' },
  { code: '61', number: 61, nameAr: 'العريشة', nameEn: 'El Aricha', ar: 'العريشة', name: 'El Aricha', region: 'الغرب' },
  { code: '62', number: 62, nameAr: 'القنطرة', nameEn: 'El Kantara', ar: 'القنطرة', name: 'El Kantara', region: 'الشرق' },
  { code: '63', number: 63, nameAr: 'بريكة', nameEn: 'Barika', ar: 'بريكة', name: 'Barika', region: 'الشرق' },
  { code: '64', number: 64, nameAr: 'بوسعادة', nameEn: 'Bou Saâda', ar: 'بوسعادة', name: 'Bou Saâda', region: 'الهضاب العليا' },
  { code: '65', number: 65, nameAr: 'بئر العاتر', nameEn: 'Bir El Ater', ar: 'بئر العاتر', name: 'Bir El Ater', region: 'الشرق' },
  { code: '66', number: 66, nameAr: 'قصر البخاري', nameEn: 'Ksar El Boukhari', ar: 'قصر البخاري', name: 'Ksar El Boukhari', region: 'الوسط' },
  { code: '67', number: 67, nameAr: 'قصر الشلالة', nameEn: 'Ksar Chellala', ar: 'قصر الشلالة', name: 'Ksar Chellala', region: 'الهضاب العليا' },
  { code: '68', number: 68, nameAr: 'عين وسارة', nameEn: 'Aïn Oussara', ar: 'عين وسارة', name: 'Aïn Oussara', region: 'الهضاب العليا' },
  { code: '69', number: 69, nameAr: 'مسعد', nameEn: 'M\'saâd', ar: 'مسعد', name: 'M\'saâd', region: 'الهضاب العليا' }
];

export const WILAYA_NAMES_LIST = ALGERIAN_WILAYAS.map(
  (w) => `${w.code} - ${w.nameAr} (${w.nameEn})`
);

export const WILAYA_ARABIC_NAMES = ALGERIAN_WILAYAS.map((w) => w.nameAr);
