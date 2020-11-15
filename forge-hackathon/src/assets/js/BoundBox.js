class BoundingBoxExtension extends Autodesk.Viewing.Extension {

    constructor(viewer, options) {

        super(viewer, options);
        this.boundBoxButton = null;
    }

    load() {
        return true;
    }

    unload() {

        const toolbar = this.viewer.toolbar;

        if (toolbar)
            toolbar.removeControl(this.boundBoxButton);

        return true;
    }


    onToolbarCreated() {
        let toolbar = this.viewer.toolbar;

        this.boundBoxButton = new Autodesk.Viewing.UI.Button('boundBoxButton');
        this.boundBoxButton.addClass('boundingBoxButton');
        this.boundBoxButton.setToolTip('Show measures');

        this.boundBoxButton.onClick = (e) => {
            var idArr = viewer.getSelection();

            var box = new BoundBox(idArr);

            viewer.select([]);
            if (idArr.length > 0) {

                for (var i = 0; i < idArr.length; i++) {

                    var bBox = box.getModifiedWorldBoundingBox(this.viewer.model, idArr[i]);

                    box.drawBox(bBox.min, bBox.max, this.viewer);
                }
            }

        };

        let measureTools = toolbar.getControl('measureTools');

        if (measureTools === null) {
            measureTools = new Autodesk.Viewing.UI.ControlGroup('measureTools');
            toolbar.addControl(measureTools);
        }
        measureTools.addControl(this.boundBoxButton);
    }

}

class BoundBox {
    constructor(fragIds) {
        this.frags = fragIds;
    }

    getModifiedWorldBoundingBox(model, dbID) {

        const nodebBox = new THREE.Box3();
        const tree = model.getInstanceTree();
        const fragList = model.getFragmentList();

        tree.enumNodeFragments(dbID, function (fragId) {
            const fragbBox = new THREE.Box3();
            fragList.getWorldBounds(fragId, fragbBox);
            nodebBox.union(fragbBox);
        }, true);
        return nodebBox;
    }

    getOriginalWorldBoundingBox() {

        const fragBoundingBox = new THREE.Box3();
        const nodeBoundingBox = new THREE.Box3();
        const fragList = NOP_VIEWER.model.getFragmentList();

        var fragmentBoxes = fragList.boxes;

        this.frags.forEach(function (fragId) {

            var boffset = fragId * 6;

            fragBoundingBox.min.x = fragmentBoxes[boffset];
            fragBoundingBox.min.y = fragmentBoxes[boffset + 1];
            fragBoundingBox.min.z = fragmentBoxes[boffset + 2];

            fragBoundingBox.max.x = fragmentBoxes[boffset + 3];
            fragBoundingBox.max.y = fragmentBoxes[boffset + 4];
            fragBoundingBox.max.z = fragmentBoxes[boffset + 5];

            nodeBoundingBox.union(fragBoundingBox);
        });

        return nodeBoundingBox;
    }


    getMesh(coordsArray) {
        const geometry = new THREE.BufferGeometry();

        geometry.addAttribute('position', new THREE.BufferAttribute(coordsArray, 3));

        geometry.computeBoundingBox();

        geometry.isLines = true;
        let material = new THREE.LineBasicMaterial({
            color: 0xFF0000,
            linewidth: 2
        });

        return new THREE.Mesh(geometry, material);

    }
    drawBox(min, max, viewer) {

        const vertices = [

            [max.x, min.y, max.z,
            max.x, max.y, max.z],

            [min.x, min.y, max.z,
            min.x, max.y, max.z],

            [min.x, min.y, min.z,
            max.x, min.y, min.z],

            [max.x, min.y, min.z,
            max.x, min.y, max.z],

            [max.x, min.y, max.z,
            min.x, min.y, max.z],

            [min.x, min.y, max.z,
            min.x, min.y, min.z],

            [min.x, max.y, max.z,
            max.x, max.y, max.z],

            [max.x, max.y, max.z,
            max.x, max.y, min.z],

            [max.x, max.y, min.z,
            min.x, max.y, min.z],

            [min.x, max.y, min.z,
            min.x, max.y, max.z],

            [min.x, min.y, min.z,
            min.x, max.y, min.z],

            [max.x, min.y, min.z,
            max.x, max.y, min.z]


        ];

        if (!viewer.overlays.hasScene('custom-scene'))
            viewer.overlays.addScene('custom-scene');

        for (var i = 0; i < vertices.length; i++) {

            let mesh = this.getMesh(new Float32Array(vertices[i]));
            viewer.overlays.addMesh(mesh, 'custom-scene');
        }

    }
}