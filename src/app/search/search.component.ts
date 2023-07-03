import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchResult: undefined | Product[]
  constructor(private activateRoute: ActivatedRoute,
    private product: ProductService) { }

  ngOnInit(): void {
    let query = this.activateRoute.snapshot.paramMap.get('query')
    //console.warn(query);
    query && this.product.searchProducts(query).subscribe((result) => {
      this.searchResult = result
    })

  }

}
