import './styles/style.scss';
import {ProgressBlock} from "./components/ProgressBlock.js";
import {CustomRangeSlider} from "./components/CustomSlider.js";
import {CustomCheckbox} from "./components/CustomCheckbox.js";
import {ProgressCircle} from "./components/ProgressCircle.js";

const progressBlock = new ProgressBlock();
const customSlider = new CustomRangeSlider();
const cc = new CustomCheckbox();
const pc = new ProgressCircle(0, 10, 5);

progressBlock.value = 37;

document.body.append(progressBlock);

progressBlock.onAnimationStart(() => {
    console.log("Animation started");
})

progressBlock.onAnimationEnd(() => {
    console.log("Animation ended");
})

progressBlock.onComplete(() => {
    console.log("Success!");
})

progressBlock.onCollapse(() => {
    console.log("Hidden")
})

progressBlock.onExpand(() => {
    console.log("Expanded")
})



