import {makeApp} from './app'
import mongoose from 'mongoose';
import {createExercise, getAllExercises, getExerciseById} from './database/exerciseModel'

const app = makeApp({createExercise, getAllExercises, getExerciseById})

const port = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost:27017/myapp").then(() => {
    app.listen(port, () => {
        console.log(`App listening to port ${port}`)
    })
})