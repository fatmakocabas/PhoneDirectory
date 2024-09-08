import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from '../models/section.model';
import { SectionRequest } from '../models/SectionRequest'; 

const API_URL = 'api/sections'; 

@Injectable({
  providedIn: 'root' 
})

export class SectionService {
  constructor(private http: HttpClient) {}

  getAllSections(): Observable<Section[]> {
    const url = `${API_URL}/getAllSections`; 
    return this.http.get<Section[]>(url);
  }

  getSection(sectionId: string): Observable<Section> {
    const url = `${API_URL}/${sectionId}`; 
    return this.http.get<Section>(url);
  }
 
  addSection(sectionRequest: SectionRequest): Observable<Section> {
    const url = `${API_URL}/add`;
    return this.http.post<Section>(url, sectionRequest);
  }
  
  updateSection(sectionId: string, sectionRequest: SectionRequest): Observable<Section> {
    const url = `${API_URL}/${sectionId}`; 
    return this.http.put<Section>(url, sectionRequest);
  }
 
  deleteSection(sectionId: string): Observable<Section> {
    const url = `${API_URL}/${sectionId}`;
    return this.http.delete<Section>(url);
  }
}
