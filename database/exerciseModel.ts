import mongoose from 'mongoose';

export type IExercise = {
    startTime: Date,
    durationInSeconds: Number,
    activityType: "running" | "walking" | "biking"
}

const exerciseSchema = new mongoose.Schema<IExercise>({
    startTime: Date,
    durationInSeconds: Number,
    activityType: String
});

export const ExerciseModel = mongoose.model("exercise", exerciseSchema);

export const createExercise = async (exercise: IExercise) => {
    const newExercise = new ExerciseModel(exercise);
    return await newExercise.save()
}

export const getAllExercises = async () => {
    return await ExerciseModel.find({})
}

export const getExerciseById = async (id: string) => {
    console.log(id)
    return await ExerciseModel.findById(id)
}