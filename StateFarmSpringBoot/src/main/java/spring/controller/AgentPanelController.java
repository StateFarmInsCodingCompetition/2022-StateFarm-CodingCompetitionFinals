/**************************************************************************
 * AgentPanelController.java codes for the rest controller that response to
 * and calls Java methods based on the mappings received from axios. Refer
 * to any additional comments for details about the code.
 *
 * Written by Tony Dong, Athulya Saravanakumar, Sophia Phu,
 * Rishindra Davuluri, Tommy Fang, Suhani Goswami,
 * Nitya Pakala, and Tejas Kalpathi.
 *
 * Big thanks to Vikas Thoutam for technical support.
 *
 * Last updated: 8/3/2022
 *************************************************************************/

package spring.controller;

import java.util.*;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class AgentPanelController {
	//@Autowired
	//BookRepository bookRepository;
	List<String> customers = new ArrayList<>();
	public AgentPanelController() {
		System.out.println("ran constructor");
	}

	@GetMapping("/cluster")
	public List<String> getClusterInfo() {
		System.out.println("getClusterInfo ran");
		List<String> clusterInfo = new ArrayList<>();
		return clusterInfo;
	}

	@GetMapping("/keyspaces/{keyspaceName}/tables/{tableName}/columnNames")
	public List<String> getColumnNames(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table) {
		System.out.println("getColumnNames ran in keyspace " + keyspace + " in table " + table);
		return null;
	}
	@PutMapping("/keyspaces/{keyspaceName}/tables/{tableName}/addRow")
	public boolean addRow(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table, @Valid @RequestBody RowRequest added)
	{
		try{
			System.out.print("addRow ran in keyspace ");
			System.out.print(keyspace + " in table ");
			System.out.println(table + " with the following coldefs and row");
			String val = "";
			return true;
		}
		catch (Exception e) {
			return false;
		}
	}

	@PutMapping("/keyspaces/{keyspaceName}/tables/{tableName}/editRow")
	public boolean editRow(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table, @Valid @RequestBody RowRequest edited)
	{
		try{
			System.out.print("editRow ran in keyspace ");
			System.out.print(keyspace + " in table ");
			System.out.println(table + " with the following coldefs and row");
			return true;
		}
		catch (Exception e) {
			return false;
		}
	}

	@PutMapping("/keyspaces/{keyspaceName}/tables/{tableName}/deleteRow")
	public boolean deleteRow(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table, @Valid @RequestBody RowRequest deleted)
	{
		try{
			System.out.print("deleteRow ran in keyspace ");
			System.out.print(keyspace + " in table ");
			System.out.println(table + " with the following coldefs and row");
			return true;
		}
		catch (Exception e) {
			return false;
		}
	}

}
class RowRequest{
	
}