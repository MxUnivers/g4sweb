

// src/configurations/apijson/saveDataToFile.js

export const saveDataToFile = (data, filePath) => {
    const jsonData = JSON.stringify(data, null, 2);
    try {
        // Écrire dans le fichier JSON existant
        localStorage.setItem(filePath, jsonData);
        //console.log('Données écrites avec succès dans le fichier JSON.',jsonData);
    } catch (error) {
        console.error('Erreur lors de l\'écriture dans le fichier JSON :', error);
    }
};


export const getDataFromFile = (key) => {
    try {
        const jsonData = localStorage.getItem(key);
        if (jsonData) {
            return JSON.parse(jsonData);
        }
        return null;
    } catch (error) {
        // console.error('Erreur lors de la lecture depuis localStorage :', error);
        return null;
    }
};




export const  UploadeFileServer = async (formData)=>{
    try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        if (response.ok) {
          alert("File uploaded successfully!");
          // console.log(result); // Show file data
        } else {
          alert("File upload failed.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
}