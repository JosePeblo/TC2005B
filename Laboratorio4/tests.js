// Pruebas problema 3
const problem3Test1 = () => {
    const res = problem3([1,2,3,4,5,6]);
    return (res.neg === 0 && res.zero === 0 && res.pos === 6);
}
const problem3Test2 = () => {
    const res = problem3([-1,-2,-3,-4,-5,-6]);
    return (res.neg === 6 && res.zero === 0 && res.pos === 0);
}
const problem3Test3 = () => {
    const res = problem3([0,0,0,0,0,0]);
    return (res.neg === 0 && res.zero === 6 && res.pos === 0);
}
const problem3Test4 = () => {
    const res = problem3([1,0,2,0,3,0,4,0,5,0,600,-2,-3000,1.2,-4.4]);
    return (res.neg === 3 && res.zero === 5 && res.pos === 7);
}
const problem3Test5 = () => {
    const res = problem3(['1','2','3','a','b','0','-6']);
    return (res.neg === 1 && res.zero === 1 && res.pos === 3);
}
const problem3Test6 = () => {
    const res = problem3(['uno','cero','lol','54a','5ars9','fff','2p','4k','ls']);
    return (res.neg === 0 && res.zero === 0 && res.pos === 0);
}

const TestProblem3 = () => {
    if(problem3Test1()&&problem3Test2()&&problem3Test3()&&problem3Test4()&&problem3Test5()&&problem3Test6())
        alert('Todos los casos de prueba pasados');
    else
        alert('No pasó todos los casos de prueba');
}

// Pruebas problema 4
const problem4Test1 = () => {
    return (JSON.stringify(problem4([[1,2,3],[4,5,6],[7,-8,-9,-10]])) === '[2,5,-5]');
}
const problem4Test2 = () => {
    return (JSON.stringify(problem4([[]])) === '[]');
}
const problem4Test3 = () => {
    return (JSON.stringify(problem4(['a'])) === '[]');
}
const problem4Test4 = () => {
    return (JSON.stringify(problem4([['a']])) === '[0]');
}

const TestProblem4 = () => {
    if(problem4Test1()&&problem4Test2()&&problem4Test3()&&problem4Test4())
        alert('Todos los casos de prueba pasados');
    else
        alert('No pasó todos los casos de prueba');
}

// Pruebas problema 5
const problem5Test1 = () => {
    return (problem5(987654321) === 123456789);
}
const problem5Test2 = () => {
    return isNaN(problem5('a'));
}
const problem5Test3 = () => {
    return (problem5(2030405006) === 6005040302);
}
const TestProblem5 = () => {
    if(problem5Test1()&&problem5Test2()&&problem5Test3())
        alert('Todos los casos de prueba pasados');
    else
        alert('No pasó todos los casos de prueba');
}