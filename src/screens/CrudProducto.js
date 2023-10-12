
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import{show_alert}  from '../functions'; 
import  axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const CrudProducto = () => {
    const url = 'https://dummyjson.com/products/';
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState();
    const [price, setPrice] = useState('');



    const [operation,setOperation]= useState('');
    const [title,setTitle]= useState('');  

    


    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async () => {
        const respuesta = await axios.get(url);
        let datos = respuesta.data.products;
        setProducts(datos);
        console.log(products);
    }

    const openModel = (op, id, name, category,brand,stock,price) => {

        setId('');
        setName('');
        setCategory('');
        setBrand('');
        setStock('');
        setPrice('');
        setOperation(op);
        if(op === 1){
            setTitle('Nuevo Producto');
        }else if(op === 2){
            setTitle('Modificar Producto');
            setId(id);
            setName(name);
            setCategory(category);
            setBrand(brand);
            setStock(stock);
            setPrice(price);
        }

        window.setTimeout(function(){
            document.getElementById('nombre').focus();
        },500);

    }


    const validar = () =>{
        var paramentros; 
        var metodo; 
        if(name.trim() === ''){
            show_alert('Escribe el nombre del producto','warning');
        }else if(category.trim() === ''){
            show_alert('Escribe la categoria del producto','warning');

        }else if(brand.trim() === ''){
            show_alert('Escribe la marca del producto','warning');

        }else if(Number(stock) < 0){
            show_alert('Escriba la catidad de productos disponibles','warning');
        }else if(Number(price) < 0){
            show_alert('El precio del producto no puede ser un número negativo','warning');
        }else{

            if(operation === 1){
                paramentros = { title : name.trim(), category: category.trim(), brand: brand.trim(), stock: stock, price: price}
                metodo = 'POST';
            }else{
                paramentros = { id: id, title : name.trim(), category: category.trim(), brand: brand.trim(), stock: stock, price: price}
                metodo= 'PUT'
            }

            enviarSolicitud(metodo,paramentros);

        }

    }


    const enviarSolicitud = async(metodo,paramentros) => {
        var nuevaUrl = ''
        if(metodo == 'POST'){
             nuevaUrl = url+'add'
        }else{
            nuevaUrl = url+paramentros.id
        }

        // fetch('https://dummyjson.com/products/add', {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({
        //     paramentros
        //     /* other product data */
        // })
        // })
        // .then(res => res.json())
        // .then(console.log());
        // console.log(nuevaUrl);
      
        await axios({ method: metodo, url: nuevaUrl, data: JSON.stringify({paramentros})}).then(function(respuesta){
            var tipo = respuesta.data;
            var mensaje = respuesta.mensaje;

            if(metodo == 'POST'){
                show_alert("Se añadio exitosamente",'success');
            }else{
                show_alert("Se modifco exitosamente",'success');
            }
          
           
            document.getElementById('btnCerrar').click();
                //getProducts();

            agregarProductoMemoria(respuesta.data,paramentros,metodo);
          
        }).catch(function(error){
            show_alert('Error en la solictud','error');
            console.log(error);
        });
    }

    const agregarProductoMemoria = (producto, paramentros,metodo) => {

        if(metodo == 'POST'){
            paramentros.id = producto; 
            // products.push(paramentros)
            // setProducts(products);
            setProducts(prevLista => {
                const nuevaLista = [...prevLista, paramentros];
                console.log(nuevaLista);
                return nuevaLista;
            });
        }else{
            var productoModificado = products.find(p => p.id == producto.id);

            if(productoModificado != undefined){
                products.find(p => p.id == producto.id).title = paramentros.title;
                products.find(p => p.id == producto.id).category = paramentros.category;
                products.find(p => p.id == producto.id).brand = paramentros.brand;
                products.find(p => p.id == producto.id).stock = paramentros.stock;
                products.find(p => p.id == producto.id).price = paramentros.price;


                setProducts(() => {
                const nuevaLista = [...products];
               
                return nuevaLista;
                });



            }

        }
          
    
    }

    const eliminarProducto = (id,name) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title:'¿Seguro de que desea eliminar el producto' + name +' ?',
            icon: 'question',
            showCancelButton:true,
            confirmButtonText:'Si,eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result)=>{
            if(result.isConfirmed){
                setId(id);
                fetch('https://dummyjson.com/products/'+id, {
                     method: 'DELETE',
                })
                .then(res => {
                    show_alert("Se elimino correctamente",'success');
                    setProducts((lista) => {
                        const nuevaLista = lista.filter(x => x.id != id);
                        // console.log(nuevaLista);
                        return nuevaLista;
                    });

                })
                .then();
            }
        })
    }

    

    return (
      
        <div className='App'>
            <div className='contairner-fluid'>
                <div className='row mt-3'>
                  
                        <div className="d-grid d-md-flex justify-content-md-end">
                            <button onClick={()=> openModel(1)} type="button" className="btn btn-primary btn-sm" data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                <i className='fa-solid fa-circle-plus'></i> Añadir 
                            </button>    
                        </div>    
                
                </div>

                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                        <div className='table-responsive'>
                            <table className='tabla tabla-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Categoria</th>
                                        <th>Marca</th>
                                        <th>Stock</th>
                                        <th>Precio</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider'>

                                {products?.map((producto,i) => (
                                    <tr key={producto.id}>
                                         <td>{(i+1)}</td>
                                         <td>{producto.title}</td>
                                         <td>{producto.category}</td>
                                         <td>{producto.brand}</td>
                                         <td>{producto.stock}</td>
                                         <td>${ new Intl.NumberFormat('es-mx').format(producto.price)}</td>
                                         <td>
                                             <button onClick={()=> openModel(2,producto.id,producto.title,producto.category,producto.brand,producto.stock,producto.price)}
                                              className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                                <i className='fa-solid fa-edit'></i>
                                             </button>
                                             &nbsp;
                                             <button onClick={()=> eliminarProducto(producto.id,producto.title)} className='btn btn-danger'>
                                                <i className='fa-solid fa-trash'></i>
                                             </button>
                                         </td>

                                     </tr>
                                ))}

                               

                                </tbody>
                               

                            </table>

                        </div>
                    </div>

                </div>
            </div>

            <div id='modalProducts' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div class="modal-header">
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' arial-label='Cerrar'></button>
                        </div>

                        <div className="modal-body">
                            <input type='hidden' id='id'></input>
                            <div className='input-group mb-3'>
                                {/* <span className='input-group-text'><i className='fa-solid fa-gift'></i> </span> */}
                                <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={name}
                                onChange={(e)=> setName(e.target.value)} ></input>
                            </div>

                            <div className='input-group mb-3'>
                                {/* <span className='input-group-text'><i className='fa-solid fa-gift'></i> </span> */}
                                <input type='text' id='categoria' className='form-control' placeholder='Categoria' value={category}
                                onChange={(e)=> setCategory(e.target.value)} ></input>
                            </div>

                            <div className='input-group mb-3'>
                                {/* <span className='input-group-text'><i className='fa-solid fa-gift'></i> </span> */}
                                <input type='text' id='marca' className='form-control' placeholder='Marca' value={brand}
                                onChange={(e)=> setBrand(e.target.value)} ></input>
                            </div>

                            <div className='input-group mb-3'>
                                {/* <span className='input-group-text'><i className='fa-solid fa-gift'></i> </span> */}
                                <input type='number' id='stock' className='form-control' placeholder='Stock' value={stock}
                                onChange={(e)=> setStock(e.target.value)} ></input>
                            </div>

                            <div className='input-group mb-3'>
                                {/* <span className='input-group-text'><i className='fa-solid fa-gift'></i> </span> */}
                                <input type='number' id='precio' className='form-control' placeholder='Precio' value={price}
                                onChange={(e)=> setPrice(e.target.value)} ></input>
                            </div>

                            <div className='d-grid col-4 mx-auto'>
                                <button onClick={()=> validar()} className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                                </button>
                            </div>

                        </div>

                        <div className='modal-footer'>

                            <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                        </div>



                    </div>
                </div>

            </div>
        </div>
    );
};

export default CrudProducto;