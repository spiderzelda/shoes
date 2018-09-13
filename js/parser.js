$( document ).ready(function() {
    parseData();
});

//file parser
function parseData(){
    let shoesList = [];
    $(function(){
        $.getJSON('zapato.json',function(data){
            for (let i = 0; i < data.length; i++) {
                var shoeObj = new shoe(data[i])
                shoesList.push(shoeObj);
            }
            runApp(shoesList);
        }).error(function(){
            console.log('error loading data');
        });
    });
    
}


