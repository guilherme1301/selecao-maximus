<template>
    <div class="container">
        <h3>{{headerMessage}}: <span style="text-decoration: underline;">{{this.newEvent.title}}</span></h3>
        <br>
        <div class="row z-depth-2 form-row">
            <form class="col s12" @submit.prevent="submit">
                <div class="row">
                    <div class="input-field col s6">
                        <input id="event_title" type="text" class="validate" required v-model="newEvent.title">
                        <label for="event_title">Título do evento</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <textarea id="event_description" type="text" class="validate materialize-textarea" required v-model="newEvent.description"></textarea>
                        <label for="event_description">Descrição do evento</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col m3 s12">
                        <input id="event_startDate" type="text" class="datepicker validate" required v-model="newEvent.startDate">
                        <label for="event_startDate">Data de início</label>
                    </div>
                    <div class="input-field col m2 s12">
                        <input id="event_startTime" type="text" class="timepicker validate" required v-model="newEvent.startTime">
                        <label for="event_startTime">Hora de início</label>
                    </div>
                    <div class="col s2 center">
                        <h5>-</h5>
                    </div>
                    <div class="input-field col m3 s12">
                        <input id="event_endDate" type="text" class="datepicker validate" required v-model="newEvent.endDate">
                        <label for="event_endDate">Data de término</label>
                    </div>
                    <div class="input-field col m2 s12">
                        <input id="event_endTime" type="text" class="timepicker validate" required v-model="newEvent.endTime">
                        <label for="event_endTime">Hora de término</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col m3 s12">
                        <input id="event_totalAmtTickets" type="number" class="validate" required v-model="newEvent.totalAmtTickets">
                        <label for="event_totalAmtTickets">Número total de ingressos</label>
                    </div>
                    <div class="input-field col m3 s12">
                        <input id="event_ticketPrice" type="number" class="validate" min="0" step="any" required v-model="newEvent.ticketPrice">
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
                         <div v-if="allTagsArray == null" class="progress col s6 center">
                            <div class="indeterminate"></div>
                        </div>
                        <div v-else v-for="(tag, idx) in allTagsArray" :key="idx">
                            <label>
                                <input type="checkbox" :id="`tag_${tag}`" class="filled-in" :value="tag" v-model="newEvent.tags"/>
                                <span>{{tag}}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="input-field col">
                        <button class="btn waves-effect waves-light red" type="cancel" name="cancelar">Cancelar
                            <i class="material-icons right">close</i>
                        </button>
                    </div>
                    <div class="input-field col">
                        <button class="btn waves-effect waves-light green" type="submit" name="salvar">Salvar
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
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
                tags: []
            },

            allTags_db:null,
            allTagsArray: null,
            events_dataBase: null,
        }
    },
    computed: {
        headerMessage(){
            if(this.$route.name == 'addNewEvent' ){    
                return 'Adicionar novo evento'
            }
            else if(this.$route.name == 'editEvent'){
                return 'Editanto evento'
            }
            
        },
    },
    firestore(){
        return{
            allTags_db: db.collection('tags'),
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
            let currentTimePicker = null;
            let elems = document.querySelectorAll('.timepicker');
            let instances = M.Timepicker.init(elems, {
                onOpenEnd(){
                    //Check which input form is open to assign the time value to the right property
                    // console.log("Hora " + hr + "  - Min " + min)
                    elems.forEach((e) => {
                        if(e.M_Timepicker.isOpen){
                            //Store currentTimePicker object
                            currentTimePicker = e.M_Timepicker
                            
                        }
                    })
                },
                onCloseEnd(){
                    if(currentTimePicker.el.id == "event_startTime"){
                        vm.newEvent.startTime = currentTimePicker.el.value
                    }
                    else if(currentTimePicker.el.id == "event_endTime"){
                        vm.newEvent.endTime = currentTimePicker.el.value
                    }
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
                        }
                    })
                },
                //Assign the right selected (or not) value to the right property
                onClose(){
                    if(currentDatePicker.el.id == "event_startDate"){
                        vm.newEvent.startDate = currentDatePicker.el.value
                    }
                    else if(currentDatePicker.el.id == "event_endDate"){
                        vm.newEvent.endDate = currentDatePicker.el.value
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
                format: 'dd-mm-yyyy',
                container: 'body',
                minDate: new Date(),
                autoClose: true,
                twelveHour: false,
            });
        },

        submit(){
            db.collection('events').add(this.newEvent)
                .then( resp => {
                    console.log("Evento criado com sucesso!");
                    console.log(resp);
                    this.$router.push({name: 'mainScreen'});
                })
                .catch( err => {
                    console.log(err)
                })
        }
    },
    mounted(){
        //Initialize newEvent property
        if(this.$route.params.event){
            this.newEvent = this.$route.params.event
        }
        console.log(this.newEvent)
        
        this.initializeTimePicker()
        this.initializeDatePicker()

        
        //Reinitialize Materialize lables and text area
        setTimeout(()=>{
                M.updateTextFields();
                M.textareaAutoResize($('#event_description'));
            }, 10)
    },
}
</script>

<style scoped>
.tagsCol > div{
    display: inline-block;
    padding: 0 7px;
}
.form-row{
    padding: 10px;
    background-color: #41469369;
}
label{
    color: #fff
}
.helper-text{
    color: #9e9e9e;
}
.input-field input, .input-field textarea{
    color: #fff;
}
</style>
