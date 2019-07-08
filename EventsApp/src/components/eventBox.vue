<template>
    <tr>
        <div class="collection">
            <div class="collection-item row">
                <span class="title col m3 s12">{{this.event.title}}</span>
                <p class="col m5 s12">{{this.event.description}}</p>
                <div class="col m2 s12 center-align">
                    <p style="font-weight: bold">24/03/2019</p>
                    <p>08:00 - 16:00</p>
                </div>
                <div class="icons col m2 s12">
                    <a href="#!" class=""><i class="material-icons">edit</i></a>
                    <a href="#!" class=""><i class="material-icons">delete</i></a>
                </div>
            </div>
        </div>
    </tr>
</template>

<script>
export default {
    props:[
        'event'
    ]
}
</script>

<style>
.icons{
    text-align: right
}
.title{
    font-size: 20px
}
.collection{
    margin: 1rem 0 1rem 0;
}
.collection-item{
    transition: .2s;
    cursor: pointer;
    border-left: 10px solid green;
}
.collection-item:hover{
    background-color: #00000017;
}
</style>
