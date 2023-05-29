import IQuestion from "../interfaces/IQuestion";
import FileStorageService from "../services/fileStorageService";

const fileStorageService = FileStorageService.getInstance();

export default function getQuestions(path: string) {
    const allQuestionsObject = fileStorageService.readJsonFile(path, true) as IQuestion[];
    return new Map<number, IQuestion>(allQuestionsObject.map((e: IQuestion, index: number) => [index, e]));
}
