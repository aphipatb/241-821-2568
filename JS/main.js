//console.log("hello word")
//console.log("this is a test JavaScript")

//String, Number, Boolen,Object,Array 


/**
let fname ="john";
console.log("Name:",fname);
const PI=3.14;

let age =30;

let height= 5.9;


fname = "Alice";
fname = "Bob";
console.log("Name:",fname);
console.log("Age:",age);
console.log("Height",height);
*/


/**
 let number1="10";
let number2="3";

let result1 =number1+ number2;
console.log("ผลบวก:",result1);

 */


/** 
let number1 =10;
let number2=20;
let condition = number1 < number2; //boolen ค่าความจริง  true หรือfalse
onsole.log("condition",condition);
*/



/**
//if-else condition
let number1 =3;
let number2=5;
if(number1 > number2){
    console.log("this is if");

}
else if(number1 < number2){
    console.log("this is else if");
}
else{
    console.log("this is else");
}
 */

// let scores =prompt("ใส่คะแนนของคุณ:");
// if(scores>=80){
//     console.log("Grade = A");
// }
// else if (scores>=70){
//     console.log("Grade = B");
// }
// else if (scores>=60){
//     console.log("Grade = C");
// }
// else if (scores>=50){
//     console.log("Grade = D");
// }
// else{
//     console.log("Grade = F");
// }

/** 
let number1 = 5;
let number2 =10;

let condition =(number1>0) || (number2>0);
console.log("condition", condition);


let age =25;
let gender = "female"
if(age >=18 && gender=="female"){
    console.log("คุณสามารถเข้าร่วมกิจกรรมได้");
} 
    */
/**    
let number1 =20;
if (number1 % 2 == 0){
    console.log("เป็นเลขคู่");
}else{
    console.log("เป็นเลขคี่")
}
*/

// let conter =0;
// while(conter <= 9){
//     conter,=,conter+1;
//     console.log("while",conter);
// }
// for(let i=0;i<=4;i=i+1){
//     console.log("for",i)
// }

//////////////////////////////////////////////////////

// let  age = 25;
// let age2 = 30;
// let age3 = 30;

// let ages =[20,30,35]
// console.log(ages)
// console.log(ages[1])

// ages =[40,45,50]
// console.log(ages)

// ages.push(55);
// console.log(ages)

// console.log(ages.length)

// ages.pop();
// console.log(ages)

// if (ages.includes(45)){
//     console.log("พบ45 ในอาเรย์")
// }
// let number =[90,60,80,40,50];
// number.sort();
// console.log(number);    

// let name =["john","jane","Doe"];
// name.push("Smith");
// console.log(name);
// console.log(name.length);


// for (let i = 0 ;i<name.length; i++){
//     console.log(name[i])
// }

// let student =[{
//     age: 20,
//     names:"emma",
//     grade: 'A'
// },{
//     age: 22,
//     name: "lima",
//     grade: 'b'

// }
// ];
// for (let i =0 ; i <student.length;i++){
//     console.log("Student"+ (i+1)+":");
//     console.log("Name"+ student[i].name);
//     console.log("Age:"+student[i].age);
//     console.log("Grade"+ student[i].grade);
// }
// student.push({

// })

//ประกาศฟังก์ชัน
// function calculate_grade(score){
//     if (score>=90){
//         grade ='A';
//     }
//     else if (score>=80){
//         grade ='B';
//     }   
//     else if (score>=70){
//         grade ='C';
//     } 
//     else if (score>=60){
//         grade ='D';
//     } 
//     else{
//         grade ='F';
//     }
//     return grade;

// }
// let student_score= 80;
// let student_grade = calculate_grade(student_score);
// console.log("Student's grade is :"+student_grade);


// let score =[10,20,30,40,50];
// for (let i=0;i<score.length;i++){
//     console.log(`Score at index ${i} is ${score[i]}`);
// }
// score.forEach((s)=>{
//     console.log(`score`,s)
// })
// score =score.map((s)=>{
//     return s*2
// })
// score.forEach((s)=>{
//     console.log(`new score`,s)
// })

// let score=[10,20,30,40,50]
// for (let index = 0;index< score.length;index++){
//     console.log(`Score:`,score[index]);
// }
// let newscore =score.filter((s)=>{
//     return s >= 30
// })

// newscore.forEach((ns)=>{
//     console.log(`new Score`,ns)
// })


let students =[
    {
        name: 'aa',
        score: '50',
        grade: 'A'
    },
    {
        name: 'bb',
        score: '60',
        grade: 'B'

    }
]
console.log(`Student :`,students[0])

let student = students.find((s)=>{
    if(s.name =='bb'){
        return true
    }
})
let doublescore_student =students.map((s)=>{
    s.score =s.score*2
    return s

})
console.log(`student:`,student)

console.log(doublescore_student)
let highScore_student =students.filter((s)=>{
    if (s.score >= 110){
        return true
    }
})
console.log(`highScore_student: `,highScore_student)