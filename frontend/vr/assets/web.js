function loadSessionEnvironment() {
    let currentProps = document.querySelectorAll("[propId]");

    currentProps.forEach(v => {
        v.remove();
    })

    const sessionData = fetch(`/session/active`).then(d => d.json()).then(d => {
        loadProps(d);
    });
}



function loadProps(data) {
    data.scene.props.forEach(val => {
        let exists = document.querySelector(`[propId='${val.id}']`);

        if(exists != null) {
            return;
        }

        loadProp(val);
    });
}

function loadProp(val) {
    if(val.default_shown !== undefined && val.default_shown === false) {
        return false;
    }

    

    if(val.background_image_path != null) {
        return makeBackground(val);
    }

    return makeModel(val);
}

function makeModel(modelObject) {
    let parent = document.querySelector('a-scene');
    let aEntity = document.createElement('a-entity');

    aEntity.setAttribute('propId', modelObject.id);
    aEntity.setAttribute('gltf-model', modelObject.model_path);

    if(modelObject.x_pos_scale != null && modelObject.y_pos_scale != null && modelObject.z_pos_scale) {
        aEntity.setAttribute('scale', {x: modelObject.x_pos_scale, y: modelObject.y_pos_scale, z: modelObject.z_pos_scale });
    }

    if(modelObject.x_pos_from != null && modelObject.y_pos_from != null && modelObject.z_pos_from) {
        aEntity.setAttribute('position', {x: modelObject.x_pos_from, y: modelObject.y_pos_from, z: modelObject.z_pos_from });
    }
    
    if(modelObject.movement_type !== 'Stationary' && modelObject.movement_type !== 'Rotation')  {
        aEntity.setAttribute('animation', `property: position; from: ${modelObject.x_pos_from} ${modelObject.y_pos_from} ${modelObject.z_pos_from} ; to: ${modelObject.x_pos_to} ${modelObject.y_pos_to} ${modelObject.z_pos_to} ; dur: ${modelObject.duration}; easing: ${modelObject.easing};  loop: true`);
    }

    if(modelObject.animation_mixer != null) {
        aEntity.setAttribute('animation-mixer', `${modelObject.animation_mixer}`);
    }

    if(modelObject.audio_path != null && modelObject.volume != null) {
        aEntity.setAttribute('sound', `src: url(${modelObject.audio_path}); autoplay: true; loop: true; volume: ${modelObject.volume};`);
    }

    if(modelObject.loop != null) {
        aEntity.setAttribute('loop', `${modelObject.loop}`);
    }
    if(modelObject.movement_type == 'Rotation') {
        let rOuter = document.createElement('a-entity');
        
        aEntity.setAttribute('position', {x: modelObject.x_pos_outer, y: modelObject.y_pos_outer, z: modelObject.z_pos_outer });
        aEntity.setAttribute('rotation', {x: modelObject.x_pos_rot, y: modelObject.y_pos_rot, z: modelObject.z_pos_rot});
        rOuter.setAttribute('position', {x: modelObject.x_pos_from, y: modelObject.y_pos_from, z: modelObject.z_pos_from});
        rOuter.setAttribute('animation', `property: rotation; to: ${modelObject.x_pos_to} ${modelObject.y_pos_to} ${modelObject.z_pos_to} ; dur: ${modelObject.duration}; easing:${modelObject.easing}; loop:true;`);
        
        rOuter.appendChild(aEntity);
        parent.appendChild(rOuter);
        return true;
    }


    parent.appendChild(aEntity);
}


function makeBackground(backgroundObject) {
    let scene = document.querySelector('a-scene');
    let element = document.createElement('a-sky');
    element.setAttribute('propId', backgroundObject.id);
    element.setAttribute('src', backgroundObject.background_image_path);
    scene.appendChild(element);
    return true;
}

function removeProp(id) {
    let element = document.querySelectorAll(`[propId='${id}']`);
    if(element.length !== 0) {
        element.forEach(e => {
            e.remove();
        });
    }
}

function changeVolume(data) {
    let element = document.querySelector(`[propId='${data.id}']`);
    
    if(element === null) {
        return false;
    }

    element.setAttribute('sound', { volume: data.volume });
}