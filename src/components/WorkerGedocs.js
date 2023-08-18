import React from "react";
import FileUpload1 from './FileUpload1.js'
const FileUploader=({ requests })=>{
    return(
        
            <div>
      <h2 className="title-plan ">Liste des demandes</h2>
      <table>
        <thead>
          <tr>
            <th>Option</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
              <FileUpload1/>
              </td>
            </tr>
          
        </tbody>
      </table>
        </div>
    )
}
export default FileUploader;