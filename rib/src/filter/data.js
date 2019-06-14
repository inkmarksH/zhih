export default function(value) {
    var a=value.substr(0,4)
    var b=value.substr(4,2)
    var c=value.substr(6)
    var str ='日一二三四五六'
    var week=new Date(a+'/'+b+"/"+c).getDay()
    
    var w='星期'+str[week]
    return b+'月'+c+'日'+''+w
}