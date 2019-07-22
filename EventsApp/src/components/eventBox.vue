<template>
    <div class="collection">
        <div class="collection-item row stretch" @click.prevent="$router.push({name: 'editEvent', params: {event: event}})">
            <div class="col m3 s12 title">
                <span>{{this.event.title}}</span>
                <hr>
                <p style="font-size: 15px; color: #ffffffc2">
                    <i class="material-icons left" style="margin-right: 5px">confirmation_number</i> Ingressos restantes: <br>
                    {{this.event.availableTickets}} ({{this.event.totalAmtTickets - this.event.availableTickets}} usados)</p>
            </div>
            <div class="col m5 s12">
                <p>{{this.event.description}}</p>
                <div class="chip" v-for="(tag, idx) in this.event.tags" :key="idx">
                    {{tag}}
                </div>
            </div>
            <div class="col m2 s12 center-align grey">
                <p style="font-weight: bold">{{this.eventDate}}</p>
                <p>{{this.event.startTime}} - {{this.event.endTime}}</p>
            </div>
            <div class="icons col m2 s12">
                <router-link tag="a" :to="{name: 'editEvent', params: {event: this.event}}" class="btn-small teal lighten-1"><i class="material-icons">edit</i></router-link>
                <a @click="deleteEvent()" class="btn-small red lighten-1"><i class="material-icons">delete</i></a>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../firebase'

export default {
    props:[
        'event'
    ],
    computed: {
        eventDate(){
            if(this.event.startDate == this.event.endDate){
                return this.event.startDate;
            }
            else{
                return `${this.event.startDate} até ${this.event.endDate}`
            }
        }
    },
    methods: {
        deleteEvent(){
            if(confirm("Tem certeza que quer deletar esse evento?")){
                db.collection('events').doc(this.event.id).delete()
                    .then(resp => {
                        console.log("Evento deletado com sucesso!")
                        console.log(resp)
                    })
                    .catch( err => {
                        console.log(err)
                    })
            }
        }
    },
}
</script>

<style>
.icons{
    text-align: right
}
.title{
    font-size: 20px
}
.grey{
    background-color: #f0beff4d !important;
}
.collection{
    margin: 1rem 0 1rem 0;
    border: none;
    box-shadow: 0 0 20px 0px #000;
}
.collection .collection-item{
    transition: .2s;
    cursor: pointer;
    border-left: 10px solid green;
    padding: 0 10px;
    background-color: #240045d1;
}
.collection .collection-item:hover{
    background-color: #13002430 ;
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
