<template>
    <div>
		<div class="row">
			<div class="card mx-auto">
				<div class="card-header text-white bg-success">
					<h4>Login</h4>
				</div>
				<div class="card-body">
					<form @submit.prevent="loginUser">
						<div class="form-group">
							<label for="email">Sähköposti</label>
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
						<input type="submit" class="btn btn-success" value="Kirjaudu"/>
					</form>
				</div>
			</div>
		</div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			email: "",
			password: ""
		}
	},
	methods: {
		...mapActions(['login']),
		loginUser(){
			let user = {
				email: this.email,
				password: this.password
			};
			this.login(user)
			.then(res => {
				if(res.data.success){
					this.$router.push('/home');
				}
			}).catch(err => {
				// eslint-disable-next-line no-console
				console.log(err)
			});
		}
	}

}

</script>

<style>
.card{
	width: 60%;
}

</style>