<template>
    <div class="collection">
        <div class="collection-item row stretch">
            <div class="col m3 s12 title">
                <span>{{this.event.title}}</span>
                <hr>
                <p style="font-size: 15px; color: #494949">
                    <i class="material-icons left" style="margin-right: 5px">confirmation_number</i> Ingressos restantes: <br>
                    {{this.event.availableTickets}} ({{this.event.totalAmtTickets - this.event.availableTickets}} usados)</p>
            </div>
            <div class="col m5 s12">
                <p>{{this.event.description}}</p>
                <div class="chip" v-for="(tag, idx) in this.event.tags" :key="idx">
                    {{tag}}
                </div>
            </div>
            <div class="col m2 s12 center-align grey lighten-3">
                <p style="font-weight: bold">24/03/2019</p>
                <p>08:00 - 16:00</p>
            </div>
            <div class="icons col m2 s12">
                <a href="#!" class="btn-small teal lighten-1"><i class="material-icons">edit</i></a>
                <a href="#!" class="btn-small red lighten-1"><i class="material-icons">delete</i></a>
            </div>
        </div>
    </div>
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
.collection .collection-item{
    transition: .2s;
    cursor: pointer;
    border-left: 10px solid green;
    padding: 0 10px;
}
.collection .collection-item:hover{
    background-color: #00000017;
}
.collection .collection-item .col{
    padding-top: 10px;
    padding-bottom: 10px
}
.stretch{
    display: flex;
    align-items: stretch
}
</style>
