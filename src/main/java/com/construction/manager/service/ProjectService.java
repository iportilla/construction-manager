package com.construction.manager.service;

import com.construction.manager.model.Contact;
import com.construction.manager.model.Project;
import com.construction.manager.repository.ContactRepository;
import com.construction.manager.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ContactRepository contactRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public List<Project> getProjectsByContact(Long contactId) {
        return projectRepository.findByContactId(contactId);
    }

    public Project saveProject(Project project, Long contactId) {
        Optional<Contact> contactOpt = contactRepository.findById(contactId);
        if (contactOpt.isPresent()) {
            project.setContact(contactOpt.get());
            return projectRepository.save(project);
        }
        throw new RuntimeException("Contact not found with id: " + contactId);
    }

    public Project updateProject(Long id, Project projectDetails) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
        project.setName(projectDetails.getName());
        project.setLocation(projectDetails.getLocation());
        project.setBudget(projectDetails.getBudget());
        project.setStatus(projectDetails.getStatus());
        project.setDescription(projectDetails.getDescription());
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
