import express, { json } from 'express';
import { getWeather } from './weather';
import {IExercise} from './database/exerciseModel'
import { isValidObjectId } from 'mongoose';

type ExerciseFunctions = {
    createExercise: (exercise: IExercise) => Promise<IExercise>,
    getAllExercises: () => Promise<IExercise[]>,
    getExerciseById: (id: string) => Promise<IExercise | null>
}

export const makeApp = ({createExercise, getAllExercises, getExerciseById}: any) => {
const app = express();

app.use(json());

app.post('/exercise', async (req, res) => {
    const exercise = await createExercise(req.body)
    res.json(exercise);
});

app.get('/exercise', async (req, res) => {
    res.json(await getAllExercises());
});

app.get('/exercise/:id', async (req, res) => {
    if(!isValidObjectId(req.params.id)){
        res.status(400)
    }

    const exercise = await getExerciseById(req.params.id);

    if (!exercise) {
        res.status(404).send();
    } else {
        const weatherAPI = await getWeather()
        res.json({ startTime: exercise.startTime, durationInSeconds: exercise.durationInSeconds, activityType: exercise.activityType, temperature: weatherAPI.daily.temperature_2m_max[0] });
    }
});

return app

}

