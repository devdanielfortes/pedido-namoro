document.addEventListener('DOMContentLoaded', () => {
    const btnNo = document.getElementById('btn-no');
    const proposalForm = document.getElementById('proposal-form'); 
    const successPopup = document.getElementById('success-popup'); 
    
    let isMoving = false;

    const moveButton = () => {
        if (isMoving) return; 
        isMoving = true;
        
        const maxW = window.innerWidth;
        const maxH = window.innerHeight;
        const btnW = btnNo.offsetWidth;
        const btnH = btnNo.offsetHeight;
        const margin = 50;

        const newX = Math.random() * (maxW - btnW - 2 * margin) + margin;
        const newY = Math.random() * (maxH - btnH - 2 * margin) + margin;

        btnNo.style.position = 'fixed'; 
        btnNo.style.left = `${newX}px`;
        btnNo.style.top = `${newY}px`;
        btnNo.style.transition = 'all 0.2s ease-out';
        
        setTimeout(() => {
            isMoving = false;
        }, 200);
    };

    btnNo.addEventListener('mouseover', moveButton);
    btnNo.addEventListener('touchstart', moveButton);
    btnNo.addEventListener('click', (e) => {
        e.preventDefault(); 
        alert('O prazo final para esta resposta é SIM. Seu futuro está aqui! 😉');
        moveButton(); 
    });

    proposalForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 

        const form = e.target;
        const formData = new FormData(form);
        const actionUrl = form.action;

        try {
            formData.append('Resposta', 'SIM! VAMOS CONSTRUIR JUNTOS! 🏗️');

            const response = await fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' 
                }
            });

            if (response.ok) {
                successPopup.classList.add('show'); 
                document.getElementById('btn-yes').disabled = true;
                document.getElementById('btn-no').disabled = true;

            } else {
                alert('Ops! Algo deu errado ao enviar a resposta. Tente novamente ou me mande uma mensagem! Código de erro: ' + response.status);
            }
        } catch (error) {
            console.error('Erro ao enviar:', error);
            alert('Erro de conexão. Por favor, me avise! Detalhes: ' + error.message);
        }
    });
});