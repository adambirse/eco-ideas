import Idea from './idea'

let data = [];

const compost = new Idea(1, 'Create a compost bin', 'Home');
const turnTapOff = new Idea(2, 'Turn tap off when brushing your teeth', 'Home');

data.push(compost, turnTapOff);

export default data;

