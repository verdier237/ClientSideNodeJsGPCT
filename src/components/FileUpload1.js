import React, { useState } from 'react';

const FileUpload1 = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleFileUpload = () => {
    // Vous pouvez utiliser Fetch ou Axios pour envoyer le fichier au serveur.
    const formData = new FormData();
    formData.append('file', selectedFile);
  };
  return (
    <div>
      <input type="file" accept=".txt,.docx" onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={!selectedFile}>
        Téléverser
      </button>
    </div>
  );
};
export default FileUpload1;