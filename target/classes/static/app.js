document.addEventListener('DOMContentLoaded', () => {
    // State
    let currentView = 'dashboard';
    let contacts = [];
    let projects = [];

    // Selectors
    const navItems = document.querySelectorAll('nav ul li');
    const viewTitle = document.getElementById('view-title');
    const viewSubtitle = document.getElementById('view-subtitle');
    const contentArea = document.getElementById('content-area');
    const addBtn = document.getElementById('add-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const dataForm = document.getElementById('data-form');
    const closeModal = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const saveBtn = document.getElementById('save-btn');

    // Init
    initView();

    // Event Listeners
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            currentView = item.dataset.view;
            updateView();
        });
    });

    addBtn.addEventListener('click', () => openModal());
    closeModal.addEventListener('click', () => closeModalOverlay());
    cancelBtn.addEventListener('click', () => closeModalOverlay());
    saveBtn.addEventListener('click', handleSave);

    async function updateView() {
        contentArea.innerHTML = '<div class="loading-state"><div class="spinner"></div><p>Syncing data...</p></div>';
        
        try {
            if (currentView === 'dashboard') {
                viewTitle.innerText = 'Dashboard';
                viewSubtitle.innerText = 'Welcome back, here\'s an overview of your projects.';
                await fetchData();
                renderDashboard();
            } else if (currentView === 'projects') {
                viewTitle.innerText = 'Projects';
                viewSubtitle.innerText = 'Manage and distribute construction project data.';
                await fetchData();
                renderProjects();
            } else if (currentView === 'contacts') {
                viewTitle.innerText = 'Contacts';
                viewSubtitle.innerText = 'Manage relationships with project stakeholders.';
                await fetchData();
                renderContacts();
            }
        } catch (error) {
            contentArea.innerHTML = `<div class="error-state"><p>Error loading data. Is the backend running?</p></div>`;
        }
    }

    async function fetchData() {
        try {
            const [contactsRes, projectsRes] = await Promise.all([
                fetch('/api/contacts'),
                fetch('/api/projects')
            ]);
            contacts = await contactsRes.json();
            projects = await projectsRes.json();
        } catch (e) {
            console.error("Fetch failed", e);
        }
    }

    function renderDashboard() {
        const activeCount = projects.filter(p => p.status === 'Active').length;
        const totalBudget = projects.reduce((acc, p) => acc + (p.budget || 0), 0);

        contentArea.innerHTML = `
            <div class="card">
                <h3>Total Projects</h3>
                <p class="meta">Across all locations</p>
                <div style="font-size: 2rem; font-weight: 700;">${projects.length}</div>
            </div>
            <div class="card">
                <h3>Active Sites</h3>
                <p class="meta">Currently in progress</p>
                <div style="font-size: 2rem; font-weight: 700; color: #16a34a;">${activeCount}</div>
            </div>
            <div class="card">
                <h3>Total Budget</h3>
                <p class="meta">Commited capital</p>
                <div style="font-size: 2rem; font-weight: 700;">$${(totalBudget / 1000000).toFixed(1)}M</div>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Budget</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${projects.slice(0, 5).map(p => `
                            <tr>
                                <td>${p.name}</td>
                                <td>${p.location}</td>
                                <td><span class="badge badge-${p.status.toLowerCase()}">${p.status}</span></td>
                                <td>$${p.budget.toLocaleString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderProjects() {
        contentArea.innerHTML = projects.map(p => {
            const contact = contacts.find(c => c.projects && c.projects.some(cp => cp.id === p.id));
            return `
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <h3>${p.name}</h3>
                        <span class="badge badge-${p.status.toLowerCase()}">${p.status}</span>
                    </div>
                    <p class="meta">${p.location}</p>
                    <p style="font-size: 0.875rem; margin-bottom: 1rem;">${p.description || 'No description provided.'}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 1rem;">
                        <span style="font-weight: 600;">$${p.budget.toLocaleString()}</span>
                        <span style="font-size: 0.75rem; color: var(--text-muted)">Contact: ${contact ? contact.firstName + ' ' + contact.lastName : 'Unassigned'}</span>
                    </div>
                </div>
            `;
        }).join('');

        if (projects.length === 0) {
            contentArea.innerHTML = `<div class="loading-state"><p>No projects found. Add one!</p></div>`;
        }
    }

    function renderContacts() {
        contentArea.innerHTML = `
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Projects</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${contacts.map(c => `
                            <tr>
                                <td>${c.firstName} ${c.lastName}</td>
                                <td>${c.company}</td>
                                <td>${c.role}</td>
                                <td>${c.email}</td>
                                <td>${c.projects ? c.projects.length : 0}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;

        if (contacts.length === 0) {
            contentArea.innerHTML = `<div class="loading-state"><p>No contacts found. Add one!</p></div>`;
        }
    }

    function openModal() {
        modalOverlay.classList.remove('hidden');
        modalOverlay.style.opacity = '1';
        
        if (currentView === 'projects') {
            modalTitle.innerText = 'Add New Project';
            dataForm.innerHTML = `
                <div class="form-group">
                    <label>Project Name</label>
                    <input type="text" name="name" class="form-control" required placeholder="e.g. Skyline Tower">
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" name="location" class="form-control" required placeholder="e.g. Chicago, IL">
                </div>
                <div class="form-group">
                    <label>Budget</label>
                    <input type="number" name="budget" class="form-control" required placeholder="5000000">
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select name="status" class="form-control">
                        <option value="Planning">Planning</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Assign Contact</label>
                    <select name="contactId" class="form-control">
                        ${contacts.map(c => `<option value="${c.id}">${c.firstName} ${c.lastName} (${c.company})</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea name="description" class="form-control" rows="3"></textarea>
                </div>
            `;
        } else {
            modalTitle.innerText = 'Add New Contact';
            dataForm.innerHTML = `
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" class="form-control">
                </div>
                <div class="form-group">
                    <label>Company</label>
                    <input type="text" name="company" class="form-control">
                </div>
                <div class="form-group">
                    <label>Role</label>
                    <input type="text" name="role" class="form-control" placeholder="e.g. General Contractor">
                </div>
            `;
        }
    }

    function closeModalOverlay() {
        modalOverlay.classList.add('hidden');
    }

    async function handleSave() {
        const formData = new FormData(dataForm);
        const data = Object.fromEntries(formData.entries());

        let url = '';
        let method = 'POST';

        if (currentView === 'projects') {
            const contactId = data.contactId;
            delete data.contactId;
            url = `/api/projects/contact/${contactId}`;
        } else {
            url = '/api/contacts';
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                closeModalOverlay();
                updateView();
            } else {
                alert('Failed to save data.');
            }
        } catch (e) {
            console.error(e);
        }
    }

    function initView() {
        updateView();
    }
});
