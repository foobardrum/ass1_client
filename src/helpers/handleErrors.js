export const handleErrors = (response) => {
    if(!response.ok){
        throw Error(response.status);
    }
    return response;
};