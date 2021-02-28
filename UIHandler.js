const popperJs = require('@popperjs/core')

window.updateText = function (target,text){
    window.spellchecktmp.word_array[target] = text
    window.render(window.spellchecktmp.target,window.spellchecktmp.word_array)
    document.getElementById('popup').innerHTML = ""
}

window.popupShow = function (target){
    const targetObj = document.getElementById('w_'+target)
    text = targetObj.innerText
    const word_list = window.spellchecker.suggest(text,10)
    let output_list = "<ul class='suggetion'>"
    for (const word of word_list) {
        output_list += `<li id="sug_${target}_${word}" ><span style="background-color: #FFFF00">${word}</span></li>`
    }
    output_list + "</ul>"
    const tooltip = document.getElementById('popup')
    tooltip.innerHTML = output_list
    popperJs.createPopper(targetObj,tooltip,{
        placement: 'bottom',
    })
    for (const word of word_list) {
        document.getElementById(`sug_${target}_${word}`).addEventListener("click",() => window.updateText(target,word))
    }
}

window.render = function (target,word_array){
    let output = ""
    console.log(word_array);
    for (const index in word_array) {
        var word = word_array[index]
        let haveDot = word.includes(".")
        word = word.replace(".", "")
        if (incorrectlist1.includes(word)){
            position = incorrectlist1.indexOf(word);
            output += `<span class="auto-correct">${correctlist1[position]}</span>`
        }else if (!window.spellchecker.check(word)){
            output += `<span class="invalid" id="w_${index}">${word}</span>`
        }else{
            output += word
        }
        if (haveDot) output += '.'
        output += ' ' 
    }
    document.getElementById(target).innerHTML = output
    for (const index in word_array) {
        var word = word_array[index]
        word = word.replace(".", "")
        try {
            document.getElementById(`w_${index}`).addEventListener("click",() => window.popupShow(index,word))
        } catch (error) {
            
        }
    }
    window.spellchecktmp = {target,word_array}
}

module.exports = window.render