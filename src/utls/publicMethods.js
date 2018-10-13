export const strMixins = {
    data () {
        return {}
    },
    methods: {
        analysisStr (val) {
            let m = val.match(/[^。]+(?=[。])/g);
            this.strArr.push(m);
        },
        getImage (imgName) {
            this.imgSrc = require('../../static/subComponents/subImg/' + imgName + '.png');
        }
    }
}