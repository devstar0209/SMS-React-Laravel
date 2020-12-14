import React from 'react'

import bg3 from './profile.jpg';
import './style.scss'

export default class ImageDragDrop extends React.Component {
    constructor(props) {
        super(props);

        this.fileInputRef = React.createRef();

        this.openFileDialog = this.openFileDialog.bind(this);
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    onDragOver(evt) {
        evt.preventDefault();
      
        if (this.props.disabled) return;
      
        this.setState({ hightlight: true });
    }

    onDragLeave() {
        this.setState({ hightlight: false });
    }

    onDrop(event) {
        event.preventDefault();
      
        if (this.props.disabled) return;
      
        const files = event.dataTransfer.files;
        if (this.props.onFilesAdded) {
          const array = this.fileListToArray(files);
          this.props.onFilesAdded(array);
        }
        this.setState({ hightlight: false });
    }

    openFileDialog() {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }

    onFilesAdded(evt) {
        if (this.props.disabled) return;

        const files = evt.target.files;
        const props = this.props;
        
        // const file = files[0];
        // const formData = new FormData();
        // formData.append("file", file, file.name);
        
        // console.log('files', file);

        // if (this.props.onFilesAdded) {
        //     const array = this.fileListToArray(files);
        //     this.props.onFilesAdded(array);
        // }

        // const preview = document.querySelector('img');
        const preview = document.getElementById("profile");
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            preview.src = reader.result;
            props.handleChangeImage(reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    fileListToArray(list) {
        const array = [];

        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }

        return array;
    }

    render(){
      
        return(
            // <Card className="mb-3 profile-block">
                <div className="dropdown-menu-header">
                    {/* <img src={bg3} className="profile-blur opacity-9"/> */}
                    <div className="menu-header-content">
                        <div className="">
                            <div 
                                onClick={this.openFileDialog} 
                                onDragOver={this.onDragOver}
                                onDragLeave={this.onDragLeave}
                                onDrop={this.onDrop}
                                style={{ cursor: this.props.disabled ? "default" : "pointer", borderRadius: 10 }} 
                                className="avatar-icon btn-hover-shine mr-0 upload-image"
                            >
                                <img src={this.props.image ? this.props.image : bg3}  id="profile"/>
                                <p>Logo</p>
                                <input
                                    ref={this.fileInputRef}
                                    className="FileInput"
                                    type="file"
                                    onChange={this.onFilesAdded}
                                    style={{display: 'none'}}
                                />
                            </div>
                        </div>
                        
                    </div>
                </div>
            // </Card>
        )
    }
}