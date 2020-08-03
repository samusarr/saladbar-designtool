<template>
	<div>
		<div class="row">
				<div class="card mx-auto">
					<div class="card-header text-white bg-primary">
						<h4>Register</h4>
					</div>
					<div class="card-body">
						<form @submit.prevent="registerUser">
							<div class="form-group">
								<label for="email">Email</label>
								<input
									id="email"
									type="text"
									placeholder="Sähköposti"
									name="email"
									v-model="email"
									class="form-control"
									/>
							</div>
							<div class="form-group">
								<label for="password">Salasana</label>
								<input
									id="password"
									type="password"
									placeholder="Salasana"
									name="password"
									v-model="password"
									class="form-control"
									/>
							</div>
							<div class="form-group">
								<label for="confirm_password">Vahvista salasana</label>
								<input
									id="confirm_password"
									type="password"
									placeholder="Vahvista salasana"
									name="confirm_password"
									v-model="confirm_password"
									class="form-control"
									/>
							</div>
							<button class="btn btn-primary">Rekisteröi käyttäjä</button>
						</form>
					</div>
				</div>
			</div>
	</div>
</template>

<script>
import { mapActions} from 'vuex';
export default {
	data(){
		return {
			email: "",
			password: "",
			confirm_password: ""
		}
	},
	methods:{
		...mapActions(['register']),
		registerUser(){
			let user = {
				email: this.email,
				password: this.password,
				confirm_password: this.confirm_password
			};
			this.register(user).then(res => {
				if(res.data.success){
					this.$router.push("login");
				}
			});
		}
	}
}

</script>

<style>

</style>