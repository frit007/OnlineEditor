import axios from 'axios';


//export GetFiles
export const LOAD_FILES = "load_files";
export const FILE_SELECTED = "file_selected";


export function loadFiles(projectId) {
    const request = axios.post('/api/projects/get_files', {
        project_id: projectId
    });

    return {
        type: LOAD_FILES,
        payload: request
    }
}

export function fileSelected(file) {
    

    return {
        type: FILE_SELECTED,
        payload: file
    }
}
