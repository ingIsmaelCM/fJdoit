export interface ICommonField {
    id: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface IDiet {
    proteins: number;
    carbohidrates: number;
    fat: number;
    maxFoods: number;
    days: string[];
}


export interface IAddress extends ICommonField {
    line1: string;
    line2: string;
    provinceId: string;
    municipeId: string;
    municipe: IMunicipe,
    province: IProvince
}

export interface ICategory extends ICommonField {
    name: string;
}

export interface IEval extends ICommonField {
    weight: number;
    height: number;
    patientId: string;
    note: string;
    patient: IPatient
}


export interface IFood extends ICommonField {
    name: string;
    categoryId: string;
    nutrientId: string;
    category: ICategory;
    nutrient: INutrient;
    plans: IPlan[]
}

export interface IFoodView extends IFood {
    portion: string;
    measure: string;
    calories: number;
    proteins: number;
    carbohidrates: number;
    fat: number;
    cholesterol: number;
    categoryName: string;
}

export interface IInfo extends ICommonField {
    email: string;
    phone: string;
    dni: string;
    gender: EInfoGender;
    infoType: EInfoType;
    infoId: string;
    note: string;
    addressId: string;
    address: IAddress
}

export enum EInfoGender {
    Masculino = "Masculino",
    Femenino = "Femenino",
    Indefinido = "Indefinido"
}

export enum EInfoType {
    Patient = "Patient",
    User = "User",
    Contact = "Contact",
}

export interface IMunicipe extends ICommonField {
    name: string;
    code: string;
    provinceId: string;
    province: IProvince
}

export interface INutrient extends ICommonField {
    portion: number;
    calories: number;
    proteins: number;
    carbohidrates: number;
    fat: number;
    cholesterol: number;
}

export interface IPatient extends ICommonField {
    name: string;
    lastname: string;
    fullname: string;
    code: string;
    dob: Date;
    plans: IPlan[];
    info: IInfo,
    province: string,
    municipe: string,
    evals: IEval[],
    eval: IEval
}


export interface IPatientView extends IPatient {
    email: string;
    phone: string;
    dni: string;
    gender: EInfoGender;
    infoType: EInfoType;
    infoId: string;
    note: string;
    addressId: string;
    line1: string;
    line2: string;
    provinceId: string;
    municipeId: string;
}

export interface IPlan extends ICommonField {
    type: EPlanType,
    day: EPlanDay;
    nutrientId: string;
    patientId: string;
    note: string;
    patient: IPatient;
    nutrient: INutrient,
    foods: IFood[]
}

export interface  IPlanView extends  IPlan{
    patientName: string;
    proteins: number;
    calories: number;
    fat: number;
    carbohidrates: number;
    realProteins: number;
    realCalories: number;
    realFat: number;
    realCarbohidrates: number;
    planfoods: IPlanFood[]

}

export enum EPlanType {
    Desayuno = "Desayuno",
    Merienda1 = "Merienda1",
    Almuerzo = "Almuerzo",
    Merienda2 = "Merienda2",
    Cena = "Cena",
}

export enum EPlanDay {
    L = "Lunes",
    M = "Martes",
    X = "Miércoles",
    J = "Jueves",
    V = "Viernes",
    S = "Sábado",
    D = "Domingo",
}

export interface IPlanFood extends ICommonField {
    planId: string;
    foodId: string;
    portion: number;
}

export interface IProvince extends ICommonField {
    name: string;
    code: string;
    municipes: IMunicipe[]
}

export interface IUser extends ICommonField {
    name: string;
    lastname: string;
    fullname: string;
    username: string;
    password: string;
}
export interface  IUserView extends  IUser{
    email: string;
    phone: string;
    dni: string;
    gender: string;
    infoType: EInfoType;
    infoId: string;
    note: string;
    addressId: string;
    line1: string;
    line2: string;
    provinceId: string;
    municipeId: string;
    municipe: string,
    province: string,
    provinceCode: string;

}
export enum ENutrientKey {
    calories = "Calorías",
    proteins = "Proteínas",
    carbohidrates = "Carbohidratos",
    fat = "Grasas",
    cholesterol = "Colesterol",
}


export enum EReminderStatus {
    pending = "Pendiente",
    completed = "Completado",
    canceled = "Cancelado"
}
export interface IReminder extends ICommonField {
    title: string;
    description: string;
    tags: string|string[];
    status: EReminderStatus;
    dueAt: string;
    day: any;
    time: any;
    doneAt: Date;
    patientId?: string;
    patient?:IPatient
}