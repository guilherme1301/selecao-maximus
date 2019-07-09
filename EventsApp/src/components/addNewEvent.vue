<template>
    <div class="container">
        <h3>Adicionar novo evento</h3>
        <hr>
        <div class="row">
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <input id="event_title" type="text" class="validate" v-model="newEvent.title">
                        <label for="event_title">Título do evento</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <textarea id="event_description" type="text" class="validate materialize-textarea" v-model="newEvent.description"></textarea>
                        <label for="event_description">Descrição do evento</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col m3 s12">
                        <input id="event_startDate" type="text" class="datepicker validate" v-model="newEvent.startDate">
                        <label for="event_startDate">Data de início</label>
                    </div>
                    <div class="input-field col m2 s12">
                        <input id="event_startTime" type="text" class="timepicker validate" v-model="newEvent.startTime">
                        <label for="event_startTime">Hora de início</label>
                    </div>
                    <div class="col s2 center">
                        <h5>-</h5>
                    </div>
                    <div class="input-field col m3 s12">
                        <input id="event_endDate" type="text" class="datepicker validate" v-model="newEvent.endDate">
                        <label for="event_endDate">Data de término</label>
                    </div>
                    <div class="input-field col m2 s12">
                        <input id="event_endTime" type="text" class="timepicker validate" v-model="newEvent.endTime">
                        <label for="event_endTime">Hora de término</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col m3 s12">
                        <input id="event_totalAmtTickets" type="number" class="validate" v-model="newEvent.totalAmtTickets">
                        <label for="event_totalAmtTickets">Número total de ingressos</label>
                    </div>
                    <div class="input-field col m3 s12">
                        <input id="event_ticketPrice" type="number" class="validate" min="0" step="any" v-model="newEvent.ticketPrice">
                        <label for="event_ticketPrice"><i class="material-icons left">attach_money</i> Preço por ingresso</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col m3 s12">
                        <input id="event_soldTickets" type="number" v-model="newEvent.soldTickets">
                        <label for="event_soldTickets">Número de ingressos vendidos</label>
                        <span class="helper-text">Opicional</span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 tagsCol">
                        <p>Tags</p>
                        <div v-for="(tag, idx) in allTagsArray" :key="idx">
                            <label>
                                <input type="checkbox" class="filled-in" :value="tag" v-model="newEvent.selectedTags"/>
                                <span>{{tag}}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </form>
            {{newEvent}}
            <p>Start Date: {{newEvent.startDate.toString()}}</p>
        </div>
    </div>
</template>

<script>
//Initialize datepicker and timepicker with portuguese translation
// $(document).ready(function(){
//     $('.datepicker').datepicker({
//         i18n: {
//             months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
//             monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
//             weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabádo'],
//             weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
//             weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
//             today: 'Hoje',
//             clear: 'Limpar',
//             cancel: 'Sair',
//             done: 'Confirmar',
//             labelMonthNext: 'Próximo mês',
//             labelMonthPrev: 'Mês anterior',
//             labelMonthSelect: 'Selecione um mês',
//             labelYearSelect: 'Selecione um ano',
//             selectMonths: true,
//             selectYears: 15,
//         },
//         format: 'dd mmmm, yyyy',
//         container: 'body',
//         minDate: new Date(),
//         autoClose: true,
//     });
// });
   


import { db } from '../firebase'

export default {
    data(){
        return{
            newEvent: {
                title: '',
                description: '',
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: '',
                totalAmtTickets: null,
                ticketPrice: null,
                soldTickets: null,
                selectedTags: []
            },

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
                this.allTagsArray = val[0].allTags
            }
        }
    },
    methods: {
        //pad(2, 4) returns "0002"
        pad(num, size){
            let s = num+"";
            while (s.length < size) s = "0" + s;
            return s;
        },
        initializeTimePicker(){
            let vm = this;
            let elems = document.querySelectorAll('.timepicker');
            let instances = M.Timepicker.init(elems, {
                onSelect(hr, min){
                    //Check which input form is open to assign the time value to the right property
                    console.log("Hora " + hr + "  - Min " + min)
                    elems.forEach((e) => {
                        if(e.M_Timepicker.isOpen){
                            console.log("Current open element", e.M_Timepicker);
                            if(e.M_Timepicker.el.id == "event_startTime"){
                                vm.newEvent.startTime = `${vm.pad(hr, 2)}:${vm.pad(min, 2)}`
                            }
                            else if(e.M_Timepicker.el.id == "event_endTime"){
                                vm.newEvent.endTime = `${vm.pad(hr, 2)}:${vm.pad(min, 2)}`
                            }
                        }
                    })
                },
                i18n: {
                    cancel: 'Sair',
                    done: 'Confirmar'
                },
                twelveHour: false,
            });
        },
        initializeDatePicker(){
            let vm = this;
            let currentDatePicker = null;
            let elems = document.querySelectorAll('.datepicker');
            let instances = M.Datepicker.init(elems, {
                onOpen(){
                    //Check which input form is open to assign the date value to the right property
                    elems.forEach((e) => {
                        if(e.M_Datepicker.isOpen){
                            currentDatePicker = e.M_Datepicker;
                            console.log("Current open element", currentDatePicker);
                        }
                    })
                },
                //Assign the right selected (or not) value to the right property
                onClose(){
                    if(currentDatePicker.el.id == "event_startDate"){
                        vm.newEvent.startDate = currentDatePicker.el.value
                        console.log(currentDatePicker)
                    }
                    else if(currentDatePicker.el.id == "event_endDate"){
                        vm.newEvent.endDate = currentDatePicker.el.value
                        console.log(currentDatePicker)
                    }
                },
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
                format: 'dd - mm - yyyy',
                container: 'body',
                minDate: new Date(),
                autoClose: true,
                twelveHour: false,
            });
        }
    },
    mounted(){
        this.initializeTimePicker()
        this.initializeDatePicker()
    },
}
</script>

<style scoped>
.tagsCol > div{
    display: inline-block;
    padding: 0 7px;
}
</style>
