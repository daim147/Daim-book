export const html = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>html{background-color: white}</style>
	</head>
	<body>
		<div id = "root"></div>
		<script>
		const handelError = (err)=>{
			const root = document.getElementById('root')
				root.innerHTML = "<div style='color: red'> <h4>Runtime Error:</h4> " + err + "</div>"
				console.error(err)
		}
		window.addEventListener('error', event=>{
			event.preventDefault()
			handelError(event.error)
		})
		window.addEventListener('message', (event)=>{
			try{
				document.getElementById('root').innerHTML = ''
				eval(event.data)
			}catch(e){
				handelError(e)
			}
		})
		</script>
		</body>
</html>
`;
