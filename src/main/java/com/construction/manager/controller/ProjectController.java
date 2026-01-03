package com.construction.manager.controller;

import com.construction.manager.model.Project;
import com.construction.manager.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/contact/{contactId}")
    public List<Project> getProjectsByContact(@PathVariable Long contactId) {
        return projectService.getProjectsByContact(contactId);
    }

    @PostMapping("/contact/{contactId}")
    public Project createProject(@PathVariable Long contactId, @RequestBody Project project) {
        return projectService.saveProject(project, contactId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        return ResponseEntity.ok(projectService.updateProject(id, projectDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
