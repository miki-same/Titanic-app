<script setup lang="ts">
import {ref,reactive} from 'vue'
import axios from 'axios'
type typeOfFeatures = {
  Sex: '男性'|'女性'|'性別は？'
  Pclass: string
  Age: number|'年齢は？'
  Parch: number|'親・子の同伴者数は？'
  SibSp: number|'兄弟姉妹の同伴者数は？'
}

 const features = reactive<typeOfFeatures>({
  //初期値の情報
   Sex: '性別は？',
   Pclass: '階級は？',
   Age: '年齢は？',
   Parch: '親・子の同伴者数は？',
   SibSp: '兄弟姉妹の同伴者数は？'
})

/*
const displayOutput = (): void =>{
  alert(`
    性別: ${features.Sex}
    階級: ${features.Pclass}
    年齢: ${features.Age}
    親・子同伴者数: ${features.Parch}
    兄弟同伴者数: ${features.SibSp}
  `);
}
*/

const displayOutput = (): void =>{
  //タイタニックAPIのURL
  const endPoint: string = 'https://ancient-bastion-45067.herokuapp.com/api/titanic'
  const validationResult: boolean = validateRequestValues()
  if (validationResult === true){
    //axios.post(エンドポイント, リクエストボディ)でAPIを叩く
    axios.post(
      endPoint, features
    ).then(
      //問題なくレスポンスが来た場合の挙動
      (response) => {
        //asでnumber型に型指定をしてrefに数値を格納
        survivalProbability.value = 100 * response.data.survival_probability as number
      }
    ).catch(
      //問題があった場合の挙動
      () =>{
        alert('エラーが発生しました。')
      }
    );
  }
}


//生存確率を格納する箱
//初期値を入力しないのでundefinedも許容
const survivalProbability = ref<number|undefined>()

const validateRequestValues = (): boolean =>{
  if (features.Sex === '性別は？'){
    alert('性別を入力してください。')
    return false
  }
  if (features.Pclass === '階級は？'){
    alert()
    return false
  }
  if (features.Age === '年齢は？'){
    alert('年齢を入力してください。')
    return false
  }
  if (features.Parch === '親・子の同伴者数は？'){
    alert('親子同伴者数を入力してください。')
    return false
  }
  if (features.SibSp === '兄弟姉妹の同伴者数は？'){
    alert('兄弟姉妹同伴者数を入力してください。')
    return false
  }
  return true
}

</script>

<template>
<p class="bg-blue-200 text-2xl p-4">Hello World!</p>
<div class="container mx-auto mt-4">
  <select class="select select-primary mb-4" v-model="features.Sex">
    <option disabled selected>性別は？</option>
    <option>男性</option>
    <option>女性</option>
  </select>
  <br>
  <select class="select select-primary mb-4" v-model="features.Pclass">
    <option disabled selected>階級は？</option>
    <option>上層クラス(お金持ち)</option>
    <option>中級クラス(一般階級)</option>
    <option>下層クラス(労働階級)</option>    
  </select>
  <br>
  <select class="select select-primary mb-4" v-model="features.Age">
    <option disabled selected>年齢は？</option>
    <option v-for="i in [...Array(121).keys()]"> <!--[0,1,...,120]-->
      {{ i }}
    </option>    
  </select> 歳
  <br>
  <select class="select select-primary mb-4" v-model="features.Parch">
    <option disabled selected>親・子の同伴者数は？</option>
    <option v-for="i in [...Array(11).keys()]">
      {{ i }}
    </option>   
  </select> 人
  <br>
  <select class="select select-primary mb-4" v-model="features.SibSp">
    <option disabled selected>兄弟姉妹の同伴者数は？</option>
    <option v-for="i in [...Array(11).keys()]">
      {{ i }}
    </option>   
  </select> 人
  <br>
  <!--クリックで入力したデータをAPIに送信-->
  <button class="btn btn-primary" v-on:click="displayOutput()">結果を出力</button>
  <template v-if="survivalProbability !== undefined">
    <div class="alert alert-error mt-4">
      あなたの生存確率は {{Math.round(survivalProbability)}} % です。
    </div>

  </template>
</div>
</template>