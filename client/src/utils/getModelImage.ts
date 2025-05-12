import { MODEL_IMAGE_MAP } from '../constants/modelImages';

export function getModelImage(modelName: string): string {
    return `/images/llms/${MODEL_IMAGE_MAP[modelName] || 'default.svg'}`;
}
