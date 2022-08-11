import {model, connection, Model, Schema} from 'mongoose'


type PhrasesType = {
    email: string,
    user: string,
    password: string,
    day: number,
    month: string,
    year: number,
    gender: string
    
}
new Schema({}, {
    versionKey: false
});

const schema = new Schema<PhrasesType>({
    email: {type: String},
    user: {type: String},
    password: {type: String},
    day: {type: Number},
    month: {type: String},
    year: {type: Number},
    gender: {type: String}
    
}, {
    versionKey: false
})




const modelName: string = 'Roblox'

export default(connection && connection.models[modelName]) ? 
    (connection.models[modelName] as Model<PhrasesType>) 
:
    model<PhrasesType>(modelName, schema)