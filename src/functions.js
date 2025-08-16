

export function getLastNumber(list=['X-0']){
    //this function return the last number of worklist or educationList
    //element are in the form X-[number] 

    return Number(list[list.length-1].split('-')[1])
}