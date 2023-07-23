<template>
  <main>
    <div class="form-div">

      <img src="" alt="">

      <form @submit="onSubmit">
        <h2>Registro</h2>
        <input v-model="username.value" :ref="username.ref" placeholder="Usuario" />
        <p v-if="username.error">{{ username.error.message }}</p>
        <input v-model="email.value" :ref="email.ref" placeholder="Correo electronico" />
        <p v-if="email.error">{{ email.error.message }}</p>
        <input v-model="password.value" :ref="password.ref" placeholder="Contraseña" />
        <p v-if="password.error">{{ password.error.message }}</p>
        <div>
          <a href="">¿Ya tienes cuenta? <span>Ingresa</span></a>
          <button type="submit">Continuar</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { useForm } from 'vue-hooks-form'

export default {

  setup() {
    const {
      useField, handleSubmit,
    } = useForm({
      validateMode: 'change'
    })

    const username = useField('username', {
      rule: {
        required: true,
        min: 3,
        message: 'Mínimo 3 caracteres'
      },
    });

    const email = useField('email', {
      rule: {
        required: true,
        asyncValidator: async (rule, value) => new Promise((resolve, reject) => {
          if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return reject(new Error('Ingresa un correo valido'))
          }
          return resolve()
        }),
      },
    })

    const password = useField('password', {
      rule: {
        required: true,
        asyncValidator: async (rule, value) => new Promise((resolve, reject) => {
          if (! /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(value)) {
            return reject(new Error(`
            La contraseña debe tener al menos 8 caracteres y contener los siguientes elementos:
             mayúsculas, minúsculas, números y símbolos
            `))
          }
          return resolve()
        }),
      },
    })

    const onSubmit = (data) => console.log(data)
    return {
      username,
      email,
      password,
      onSubmit: handleSubmit(onSubmit),
    }
  },
}
</script>

<style lang="scss" scoped>
main {
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background:linear-gradient(to left, rgba(17, 9, 92, 0.13), rgba(2, 71, 136, 0.212), rgba(16, 51, 248, 0.301));
  .form-div{
    h2{
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 1px;
    }
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.445);
    img{
      top: -100px;
      align-self: center;
      width: 150px; 
      position: absolute;
    }
    padding: clamp(1rem, 2.4vw, 3rem);
    width: 450px;
    min-width: 340px;
    background-color: #ffffffad;
    form{
      display: flex;
      flex-direction: column;
      input{
        font-size: 0.9rem;
        text-transform: uppercase;
        background: none;
        padding: 10px 0;
        margin: 8px 0;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.301);
        outline: none;
        &::placeholder{
          font-family: 'Poppins', sans-serif;
          text-transform: capitalize;
        }
      }
      p{
        font-size: 14px;
        font-style: italic;
        color: rgba(60, 45, 194, 0.534);
        font-weight: bold;
      }

      div{
        flex-wrap: wrap;
        margin-top: 1rem ;
        display: flex;
        justify-content: space-between;
        a{   
          transition: ease 0.5s;
          span{
          color: #3a10d4;
          font-weight: bold;
          text-decoration: underline;
        }
        &:hover{
          transform: translateY(-2px);
        }
        }
        button[type="submit"]{
        font-family: 'Poppins', sans-serif;
        font-weight: bold;
        width: clamp(80px, 9vw, 8.5rem);
        transition: all 0.5s;
        border-bottom: 1px solid black;
        &:hover{
          transform: translateY(-2px);
          box-shadow: 1px 2px 1px rgba(48, 18, 179, 0.596);
        }
        }
      }
    }
  }
}


@media (max-width: 768px) {
  main{
    .form-div{
      margin: 0 6px;
    }
  }
}

</style>