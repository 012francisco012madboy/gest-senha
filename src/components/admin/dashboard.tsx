const DashBoard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <div className="each-dashboard">
                    <strong>{0}</strong>
                    <p>Funcionários</p>
                </div>
                <div className="each-dashboard">
                    <strong>{0}</strong>
                    <p>Serviços</p>
                </div>
                <div className="each-dashboard">
                    <strong>{0}</strong>
                    <p>Balcões</p>
                </div>
                <div className="each-dashboard">
                    <strong>{0}</strong>
                    <p>Sessões</p>
                </div>
                <div className="each-dashboard">
                    <strong>{0}</strong>
                    <p>Senhas</p>
                </div>
            </div>
        </div>
    );
}
 
export default DashBoard;