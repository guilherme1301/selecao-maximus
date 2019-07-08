<template>
    <div class="container">
        <h3>Adicionar novo evento</h3>
        <hr>
        <div class="row">
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <input id="event_title" type="text" class="validate" v-model="title">
                        <label for="event_title">Título do evento</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <textarea id="event_description" type="text" class="validate materialize-textarea" v-model="description"></textarea>
                        <label for="event_description">Descrição do evento</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col m3 s12">
                        <input id="event_startDate" type="text" class="datepicker validate" v-model="startDate">
                        <label for="event_startDate">Data de início</label>
                    </div>
                    <div class="input-field col m2 s12">
                        <input id="event_startTime" type="text" class="timepicker validate" v-model="startTime">
                        <label for="event_startTime">Hora de início</label>
                    </div>
                    <div class="col s2 center">
                        <h5>-</h5>
                    </div>
                    <div class="input-field col m3 s12">
                        <input id="event_endDate" type="text" class="datepicker validate" v-model="endDate">
                        <label for="event_endDate">Data de término</label>
                    </div>
                    <div class="input-field col m2 s12">
                        <input id="event_endTime" type="text" class="timepicker validate" v-model="endTime">
                        <label for="event_endTime">Hora de término</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col m3 s12">
                        <input id="event_totalAmtTickets" type="number" class="validate" v-model="totalAmtTickets">
                        <label for="event_totalAmtTickets">Número total de ingressos</label>
                    </div>
                    <div class="input-field col m3 s12">
                        <input id="event_ticketPrice" type="number" class="validate" min="0" step="any" v-model="ticketPrice">
                        <label for="event_ticketPrice"><i class="material-icons left">attach_money</i> Preço por ingresso</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col m3 s12">
                        <input id="event_soldTickets" type="number" v-model="soldTickets">
                        <label for="event_soldTickets">Número de ingressos vendidos</label>
                        <span class="helper-text">Opicional</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 tagsCol">
                        <p>Tags</p>
                        <div v-for="(tag, idx) in allTagsArray" :key="idx">
                            <label>
                                <input type="checkbox" class="filled-in" :value="tag" v-model="selectedTags"/>
                                <span>{{tag}}</span>
                            </label>
                        </div>
                    </div>
                </div>
                {{selectedTags}}
            </form>
        </div>
    </div>
</template>

<script>
//Initialize datepicker and timepicker with portuguese translation
$(document).ready(function(){
    $('.datepicker').datepicker({
        i18n: {
            months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
            weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
            today: 'Hoje',
            clear: 'Limpar',
            cancel: 'Sair',
            done: 'Confirmar',
            labelMonthNext: 'Próximo mês',
            labelMonthPrev: 'Mês anterior',
            labelMonthSelect: 'Selecione um mês',
            labelYearSelect: 'Selecione um ano',
            selectMonths: true,
            selectYears: 15,
        },
        format: 'dd mmmm, yyyy',
        container: 'body',
        minDate: new Date(),
        autoClose: true,
    });

    $('.timepicker').timepicker({
    });
});
   
import { db } from '../firebase'

export default {
    data(){
        return{
            title: '',
            description: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            totalAmtTickets: null,
            ticketPrice: null,
            soldTickets: null,
            selectedTags: [],


            allTags_db:null,
            allTagsArray: null,
        }
    },
    firestore(){
        return{
            allTags_db: db.collection('tags')
        }
    },
    watch: {
        allTags_db(val){
            if(val.length > 0 ){
                console.log("tags value", val)
                this.allTagsArray = val[0].allTags
                console.log("all tags array",this.allTagsArray)
            }
        }
    },
}
</script>

<style scoped>
.tagsCol > div{
    display: inline-block;
    padding: 0 7px;
}
</style>
