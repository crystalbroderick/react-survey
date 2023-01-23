import db from "../firebase.config.js";
import {
  collection,
  getDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const templatesRef = collection(db, "templates");

class TemplateData {
  addTemplate = (newTemplate) => {
    return addDoc(templatesRef, newTemplate);
  };

  updateTemplate = (id, updatedTemplate) => {
    const templateDoc = doc(db, "templates", id);
    return updateDoc(templateDoc, updatedTemplate);
  };

  deleteTemplate = (id) => {
    const templateDoc = doc(db, "templates", id);
    return deleteDoc(templateDoc);
  };

  getAllTemplates = () => {
    return getDocs(templatesRef);
  };

  getTemplate = (id) => {
    const templateDoc = doc(db, "templates", id);
    return getDoc(templateDoc);
  };

  getTemplateQuestions = (id) => {
    //const questionsRef =  collection(db, 'templates', id, 'questions');
    const q = collection(db, "templates", id, "questions");
    return getDocs(q);
  };
}
export default new TemplateData();
